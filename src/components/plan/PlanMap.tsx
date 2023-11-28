import  {useCallback, useEffect, useState} from 'react'
import { Map, MapMarker,CustomOverlayMap } from 'react-kakao-maps-sdk';
import OverlayWrapper from '../shared/OverlayWrapper';
import DaumPostcode from "react-daum-postcode";
import { useRecoilState } from 'recoil';
import { IKakaoAddressInfo, kakaoAddressInfoState } from '../../atom/kakaoAddressInfo';
import { Col, Row, Button, Tabs, Tab,ListGroup, Card, CloseButton } from 'react-bootstrap';
import styled from 'styled-components';
import CategoryTab, { ICategoryTabProps } from './Tabs/CategoryTab';
import RecordTab, { IRecordTabProps } from './Tabs/RecordTab';
import MakePlanTab, { IMakePlanTabProps } from './Tabs/MakePlanTab';
// import useKakaoSearch from '../../hooks/useSearchKakaoMap';
// import { currentKakaoMap } from '../../atom/currentKakaoMap';
import axios from 'axios';
import useKakaoSearch from '../../hooks/useSearchKakaoMap';

export type TMarkers  = {
    lat: string,
    lng : string,
} 

export interface IMarkers {
    position? : TMarkers;
}

export type TArriveAndDeparture = {
    arrive : string,
    departure : string,
}

export interface  IDirectionRecord {
    arriveAndDeparture : TArriveAndDeparture;
    coordinate: TMarkers; 
}

const TabCategoryList = [
    {
        eventKey :'category',
        title : '카테고리 검색',
        component: ({
            searchList, 
            setKeyword, 
            kakaoKeywordSearch, 
            onClickChangePoint,
            onClickSerachRecord,
            departure,
            arrive,
            } : ICategoryTabProps) => (
            <CategoryTab
                searchList={searchList}
                setKeyword={setKeyword}
                kakaoKeywordSearch={kakaoKeywordSearch}
                onClickChangePoint={onClickChangePoint}
                onClickSerachRecord={onClickSerachRecord}
                departure={departure}
                arrive={arrive}
            />
        ),
    },
    {
        eventKey :'location',
        title : '장소 검색',
        component : ({handleComplete} :{ handleComplete: (data: any) => void }) => (
            <DaumPostcode 
                onComplete ={handleComplete} 
                autoClose={false}  
                style={{height:'500px'}}/>
        )
    },
    {
        eventKey :'record',
        title : '길찾기 기록',
        component : ({
            directionRecord,
            onClickRecordPlan
        } : IRecordTabProps) => 
        (
            <RecordTab
                directionRecord= {directionRecord}
                onClickRecordPlan = {onClickRecordPlan}
            />
        ),
    },
    {
        eventKey :'makePlan',
        title : '계획',
        component : ({
            departure, 
            arrive, 
            setKeyword,
            handleTabSelect
        } : IMakePlanTabProps) =>  
        (
            <MakePlanTab
                departure={departure}
                arrive={arrive}
                setKeyword={setKeyword}
                handleTabSelect={handleTabSelect}
            />
        )
    }
]

const PlanMap = () => {
    const [{x, y}, setAddressInfo] = useRecoilState(kakaoAddressInfoState);
    // const [map, setMap] = useState<any>();
    // const [searchList, setSearchList] = useState<IKakaoAddressInfo[] >([]); //검색기록
    const [markers, setMarkers] = useState<IMarkers[]>([]); //키워드 검색들 마커

    const [activeTab, setActiveTab] = useState('category');
    const [directionRecord, setDirectionRecord] = useState<IDirectionRecord[]>([]); //길찾기한 기록들
    const [zoomable, setZoomable] = useState(true) //zoom 막기
    const [departure, setDeparture] = useState(''); // 출발지
    const [arrive, setArrive] = useState(''); //도착지
    const [keyword, setKeyword] = useState('서울역');
    const [markerInfo, setMarkerInfo] = useState<any>(null); //현재 마커 정보

    const {searchList, kakaoKeywordSearch, map, setMap} = useKakaoSearch({setMarkers, markerInfo});

    const handleComplete = async (data: any) => {
        const searchTxt = data.address; // 검색한 주소
        const config = { headers: {Authorization : `KakaoAK ${process.env.REACT_APP_KAKAOREST_KEY}`}}; // 헤더 설정
        const url = 'https://dapi.kakao.com/v2/local/search/address.json?query='+searchTxt; // REST API url에 data.address값 전송
        await axios.get(url, config).then(async function(result) { // API호출
            if(result.data !== undefined || result.data !== null) {
                if(result.data.documents[0].x && result.data.documents[0].y) {
                      // Kakao Local API로 검색한 주소 정보 및 위도, 경도값 저장 
                    const bounds = new kakao.maps.LatLngBounds();
                    const markers : any= [];
                    const addressInfo = {
                        place_name: result.data.documents[0].address.address_name,
                        // address_name: result.data.documents[0].address.address_name,
                        road_address_name :result.data.documents[0].road_address.address_name,
                        // region_2depth_name: result.data.documents[0].address.region_2depth_name,
                        y: Number(result.data.documents[0].y),//위도
                        x: Number(result.data.documents[0].x),
                        position : {lat : Number(result.data.documents[0].y), lng: Number(result.data.documents[0].x)},
                    };
                        bounds.extend(new kakao.maps.LatLng(result.data.documents[0].y, result.data.documents[0].x))
                        markers.push(addressInfo);
                        setMarkers(markers);
                        setAddressInfo(addressInfo);
                        map.setBounds(bounds);
                    }
                }
        }).catch((error : any) => {
            console.log(error)
        });
    };

    const onClickSerachRecord = (addressInfo : IKakaoAddressInfo)  => () => {
        setAddressInfo(addressInfo);
        setMarkerInfo(addressInfo);
    }

    const onClickSearchDirection = (arriveAndDeparture : TArriveAndDeparture, coordinate : TMarkers)=> {
        if(arrive === '' || !arrive) return;
        console.log(arriveAndDeparture,'onClickSearchDri');
        setDirectionRecord((prev : IDirectionRecord[]) => 
            [
                ...prev,
                {
                    arriveAndDeparture,
                    coordinate,
                }
            ]
        );
    }

    const onClickChangePoint = (placeName: string, type: "departure" | "arrive") => () => {
        // state 가 arrive면 setDeparture를 해야하고 departure면 setArrive
        if (type === "departure") {
            setDeparture(placeName);
            if (arrive === placeName) {
                setArrive('');
            }
        } 
        if (type === "arrive") {
            setArrive(placeName);
            if (departure === placeName) {
                setDeparture('');
            }
        }
    }

    // 지난 기록에서 설정을 눌러 출발지, 도착지 설정
    const onClickRecordPlan = (departure : string, arrive : string) => (event : React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        setDeparture(departure);
        setArrive(arrive);
    }

    const handleTabSelect = (eventKey: string | null) => {
        //카테고리 선택시 실행될 함수 
        //location 에서 category이동시에 이전에 검색됐던 내용들을 다시 마커설정
        if(eventKey === 'category' && searchList.length > 0) {
            const bounds = new kakao.maps.LatLngBounds();
            const markers : any[] = searchList.map( (item : any) =>  {
                bounds.extend(new kakao.maps.LatLng(item.y, item.x));
                return {
                    ...item,
                    position: {
                        lat: item.y,
                        lng: item.x,
                    }
                }})
                setMarkers(markers);
                map.setBounds(bounds);
        }
        if(eventKey) {
            setActiveTab(eventKey);
        }
    }

    return (
        <OverlayWrapper>
            <StyledPlanRow padding={'auto'}>
                {/* 맵부분 */}
                <StyledPlanCol xs={12} lg={6}>
                    <StyledPlanMap 
                        center={{ lat: y, lng: x }}   // 지도의 중심 좌표
                        level={3}// 지도 확대 레벨
                        zoomable={zoomable}
                        onCreate={setMap}
                        >
                        {markers.map((marker : any) => (
                            <>
                                <MapMarker
                                    key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
                                    position={marker.position}
                                    onClick={() => setMarkerInfo(marker)}
                                    />
                                    {markerInfo && markerInfo.x === marker.x && markerInfo.y === marker.y && (
                                        <CustomOverlayMap position={marker.position} >
                                            <StyledMapCard>
                                                <Card.Body >
                                                    <StyledColseBtn onClick={() => setMarkerInfo(null)}/>
                                                    <Card.Title>{markerInfo.place_name}</Card.Title>
                                                    <Card.Text>{markerInfo.road_address_name}</Card.Text>
                                                    <Card.Text>{markerInfo.address_name}</Card.Text>
                                                    {departure !== markerInfo.place_name && <StyledDirectionBtn variant="secondary" onClick={onClickChangePoint(markerInfo.place_name,'departure')}>출발지로 설정</StyledDirectionBtn>}
                                                    {arrive !== markerInfo.place_name && <StyledDirectionBtn variant="secondary" onClick={onClickChangePoint(markerInfo.place_name, 'arrive')}>도착지로 설정</StyledDirectionBtn>}
                                                    <Card.Link href={`https://map.kakao.com/link/to/${markerInfo.place_name},${markerInfo.y},${markerInfo.x}`} target={"_blank"} >
                                                        <StyledDirectionBtn variant="success" onClick={() => onClickSearchDirection({arrive : markerInfo.place_name, departure : departure}, {lat : markerInfo.y, lng : markerInfo.x})} >
                                                            길찾기
                                                        </StyledDirectionBtn>
                                                    </Card.Link>
                                                </Card.Body> 
                                            </StyledMapCard>
                                        </CustomOverlayMap>
                                    )}
                            </>
                        ))}
                        <Button onClick={() => setZoomable(false)}>지도 확대/축소 끄기</Button>{" "}
                        <Button onClick={() => setZoomable(true)}>지도 확대/축소 켜기</Button>{" "}
                        <Button onClick={() => {window.open(`https://map.kakao.com/link/to/${arrive},${markerInfo.y},${markerInfo.x}`); onClickSearchDirection({arrive, departure}, {lat : markerInfo.y, lng : markerInfo.x} )}}>길찾기</Button>
                    </StyledPlanMap>
                    {departure && <div> 출발지 : {departure}</div>}
                    {arrive && <div> 도착지 : {arrive}</div>}
                </StyledPlanCol>
                {/* 검색 탭 부분 */}
                <StyledPlanCol xs={12}  lg={4} >
                    <Tabs
                        defaultActiveKey="category"
                        onSelect={handleTabSelect} 
                        activeKey={activeTab}
                        className="mb-3"
                        >
                        {/*  TabCategoryList map을 돌면 각각 탭 컴포넌트 return*/}
                        {TabCategoryList.map(({eventKey, title, component}, idx) => (
                            <Tab key={idx} eventKey={eventKey} title={title} >
                                {component({
                                    searchList,
                                    setKeyword,
                                    kakaoKeywordSearch,
                                    onClickChangePoint,
                                    onClickSerachRecord,
                                    departure,
                                    arrive,
                                    handleComplete,
                                    directionRecord,
                                    onClickRecordPlan,
                                    handleTabSelect,
                                })}
                            </Tab>
                        ))}
                    </Tabs>
                </StyledPlanCol>
            </StyledPlanRow>
        </OverlayWrapper>
    );
}

const StyledPlanRow = styled(Row)`
    display: flex;
    justify-content: center;
    padding: 0;
`

const StyledPlanMap = styled(Map)`
    height: 500px;
`

const StyledPlanCol = styled(Col)`
    margin: 30px;
`

const StyledMapCard = styled(Card)`
    position: relative;
    padding: 10px 20px;
    z-index: 1;
    & > .card-body {
        height: inherit;
        & > .card-title {
        }
        & > .card-text {
            margin: 0;
        }
    }
`


export const StyledSearchListItem = styled(ListGroup.Item)`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

export const StyledeBtnWrapper = styled.div`
    display: flex;
    gap: 10px; 
`

const StyledColseBtn = styled(CloseButton)`
    position: absolute;
    top: 5px;
    right: 5px;
`

export const StyledDirectionBtn = styled(Button)<{width?:string}>`
    padding: 5px;
    font-size: 12px;
    margin-right:10px;
    margin-top: 5px;
    width: ${({width}) => width};
`

export const StyledCurrentPlaceDiv = styled.div<{ background?: string, }>`
    background: ${props =>
        props?.background ? props.background : 'white'};
    color: ${props =>
        props?.background ? 'white' : 'black'};;
    padding: 5px 10px;
    border-radius: 30px;
`

export default PlanMap
