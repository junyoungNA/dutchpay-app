import  {useEffect, useState} from 'react'
import { Map, MapMarker,CustomOverlayMap } from 'react-kakao-maps-sdk';
import OverlayWrapper from './shared/OverlayWrapper';
import DaumPostcode from "react-daum-postcode";
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { IKakaoAddressInfo, kakaoAddressInfoState } from '../state/kakaoAddressInfo';
import { Col, Row, Button, Tabs, Tab, Form,ListGroup, Card, CloseButton, FormGroup  } from 'react-bootstrap';
import styled from 'styled-components';
import {ArrowRight} from 'react-bootstrap-icons'
import {TbTilde} from 'react-icons/tb'
import {error_animation} from '../aseets';
import Lottie from 'lottie-react';

type TMarkers  = {
    lat: string,
    lng : string,
} 

interface IMarkers {
    position? : TMarkers;
}

interface  IDirectionRecord {
    arrive : string,
    departure : string,
}

const PlanMap = () => {
    const [{x, y, place_name, road_address_name}, setAddressInfo] = useRecoilState(kakaoAddressInfoState);
    const [searchList, setSearchList] = useState<IKakaoAddressInfo[] >([]); //키워드 검색기록
    const [markers, setMarkers] = useState<IMarkers[]>([]); //키워드 검색들 마커들

    const [activeTab, setActiveTab] = useState('category');
    const [directionRecord, setDirectionRecord] = useState<IDirectionRecord[]>([]); //길찾기한 기록들
    const [zoomable, setZoomable] = useState(true) //zoom 막기
    const [map, setMap] = useState<any>();
    const [markerInfo, setMarkerInfo] = useState<any>(null); //현재 마커 정보
    const [departure, setDeparture] = useState(''); // 출발지
    const [arrive, setArrive] = useState(''); //도착지
    const [keyword, setKeyword] = useState('서울역');

    useEffect(() => {
        if (!map) return
        if(!markerInfo) kakaoKewordSerach();
    }, [map, markerInfo])
    

    const kakaoKewordSerach = () => {
        const ps = new kakao.maps.services.Places();
        ps.keywordSearch(keyword, (data:any, status, _pagination) => {
            if (status === kakao.maps.services.Status.OK) {
                // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
                // LatLngBounds 객체에 좌표를 추가합니다
                const bounds = new kakao.maps.LatLngBounds()
                const markers : any= [];
                // console.log(data, '가져온 데이터');
                for (let i = 0; i < data.length; i++) {
                    markers.push({
                        ...data[i],
                        position: {
                            lat: data[i].y,
                            lng: data[i].x,
                        }
                    })
                // extend 메소드: 이 메소드는 bounds 객체의 경계를 확장(extend)하는 데 사용됩니다
                    bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x))
                }
                    setMarkers(markers);
                    setSearchList(data);
                    // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
                    map.setBounds(bounds);
                }
            })
    }
    

    const handleComplete = async (data: any) => {
        const searchTxt = data.address; // 검색한 주소
        const config = { headers: {Authorization : `KakaoAK ${process.env.REACT_APP_KAKAOREST_KEY}`}}; // 헤더 설정
        const url = 'https://dapi.kakao.com/v2/local/search/address.json?query='+searchTxt; // REST API url에 data.address값 전송
        await axios.get(url, config).then(async function(result) { // API호출
            if(result.data !== undefined || result.data !== null){
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

    const onClickSearchDirection = (arrive? : string)=> {
        if(arrive === '' || !arrive) return;
        setDirectionRecord((prev : IDirectionRecord[]) => 
            [
                ...prev,
                {
                    departure : departure,
                    arrive : arrive,
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
                            // `https://map.kakao.com/?sName=&eName=고속터미널 길찾기 url`
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
                                                    <Card.Link href={`https://map.kakao.com/?sName=${departure}&eName=${markerInfo.place_name}`} target={"_blank"} >
                                                        <StyledDirectionBtn variant="success" onClick={() => onClickSearchDirection(markerInfo.place_name)} >
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
                        <Button onClick={() => {window.open(`https://map.kakao.com/?sName=${departure}&eName=${arrive}`); onClickSearchDirection(arrive)}}>길찾기</Button>
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
                        <Tab eventKey="category" title="키워드 검색">
                            <Form.Label htmlFor="category_text">키워드 검색</Form.Label>
                            <Form.Control
                                type="text"
                                id="category_text"
                                aria-describedby="passwordHelpBlock"
                                onChange={(e) => setKeyword(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        kakaoKewordSerach();
                                    }
                                }}
                            />
                            <Form.Text id="passwordHelpBlock" muted>
                                키워드 검색 예시("서울역 맛집", "인천 산책하기 좋은 곳")
                            </Form.Text>
                            <ListGroup as='ol' numbered>
                                {searchList?.map((addressInfo: any) => 
                                    <StyledSearchListItem action key={addressInfo.id} onClick={onClickSerachRecord(addressInfo)}>
                                        {departure === addressInfo?.place_name && <StyledCurrentPlaceDiv background='#198754'>{addressInfo.place_name}</StyledCurrentPlaceDiv> } 
                                        {arrive === addressInfo?.place_name && <StyledCurrentPlaceDiv background='#dc3545'>{addressInfo.place_name}</StyledCurrentPlaceDiv>} 
                                        {arrive !== addressInfo?.place_name && departure !== addressInfo?.place_name && <StyledCurrentPlaceDiv>{addressInfo.place_name}</StyledCurrentPlaceDiv>}
                                        <StyledeBtnWrapper>
                                            { departure === addressInfo?.place_name && <StyledDirectionBtn variant='success' disabled>현재 출발지</StyledDirectionBtn>}
                                            { arrive === addressInfo?.place_name && <StyledDirectionBtn variant='danger' disabled>현재 도착지</StyledDirectionBtn>}
                                            {departure !== addressInfo?.place_name && <StyledDirectionBtn variant="secondary"    
                                                onClick={onClickChangePoint(addressInfo?.place_name, 'departure')}>
                                                    출발지
                                            </StyledDirectionBtn>}
                                            { arrive !== addressInfo?.place_name && <StyledDirectionBtn variant="danger"    
                                                onClick={onClickChangePoint(addressInfo?.place_name, 'arrive')}
                                                >    
                                                    도착지
                                            </StyledDirectionBtn>}
                                        </StyledeBtnWrapper>
                                    </StyledSearchListItem>
                                )}
                            </ListGroup>                    
                        </Tab>
                        <Tab eventKey="location" title="장소 검색">
                            <DaumPostcode onComplete={handleComplete} autoClose={false}  style={{height:'500px'}}/>
                        </Tab>
                        <Tab eventKey="record" title="길찾기 기록">
                            {directionRecord.length === 0 && <><StyledErrorMsg>검색기록이 없어요ㅠ</StyledErrorMsg><Lottie animationData={error_animation}  loop={false}/></>}
                            <ListGroup as='ol' numbered>
                                {directionRecord?.map((record : IDirectionRecord , idx) => 
                                    <StyledSearchListItem action key={idx} onClick={() => window.open(`https://map.kakao.com/?sName=${record.departure}&eName=${record.arrive}`)}>
                                        {record.departure !== '' ?
                                            <>
                                                <StyledDirectionBtn variant='success' disabled width={'25%'}>{record.departure}</StyledDirectionBtn>
                                                <ArrowRight size={32}/>
                                                <StyledDirectionBtn variant='danger' disabled  width={'25%'}>{record.arrive}</StyledDirectionBtn>
                                                <StyledDirectionBtn  onClick={onClickRecordPlan(record.departure, record.arrive)}>설정</StyledDirectionBtn>
                                            </> 
                                            :
                                            <>
                                                <StyledDirectionBtn variant='danger' disabled width={'50%'} style={{margin:'auto'}}>{record.arrive}</StyledDirectionBtn>
                                                <StyledDirectionBtn  onClick={onClickRecordPlan(record.departure, record.arrive)}>설정</StyledDirectionBtn>
                                            </>
                                            
                                        }
                                    </StyledSearchListItem >
                                    )}
                            </ListGroup>
                        </Tab>
                        <Tab eventKey="plan" title="계획">
                            <Form.Label htmlFor="plan_title">계획 구성하기</Form.Label>
                                <StyledFormControl
                                    type="text"
                                    onChange={(e) => setKeyword(e.target.value)}
                                    placeholder='이 계획의 제목을 입력해주세요!'
                                    minLength={1}
                                    maxLength={20}
                                />
                                <StyledFormControl
                                    type='date'
                                    placeholder='계획의 날짜를 선택해 주세요.'
                                    // onChange={(e) => setDate(e.target.value)}
                                />
                                <FormGroup style={{display:'flex', alignItems:'center',}}>
                                    <StyledFormControl
                                        type='text'
                                        placeholder='출발지'
                                        defaultValue={departure}
                                    />
                                    <StyledIcon>
                                        <ArrowRight/>
                                    </StyledIcon>
                                    <StyledFormControl
                                        type='text'
                                        placeholder='도착지'
                                        defaultValue={arrive}
                                    />
                                    <StyledDirectionBtn onClick={() => handleTabSelect('record')}>길찾기 기록</StyledDirectionBtn>
                                </FormGroup>
                                <FormGroup style={{display:'flex', alignItems:'center'}}>
                                    <StyledFormControl
                                        type='time'
                                    />
                                    <StyledIcon>
                                        <TbTilde/>
                                    </StyledIcon>
                                    <StyledFormControl
                                        type='time'
                                    />
                                </FormGroup>
                                <StyledFormControl
                                        as='textarea'
                                        placeholder='내용을 입력해주세요.'
                                        width='100%'
                                        row={100}
                                />
                            {/* <Form.Label htmlFor="plan_title">계획의 걸리는 시간을 입력해주세요.</Form.Label> */}
                        </Tab>
                    </Tabs>
                </StyledPlanCol>
            </StyledPlanRow>
        </OverlayWrapper>
    );
        
}

const StyledIcon = styled.div`
    font-size: 20px;
    margin: 6px 5px 0 5px;
`;

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

    /* 다른 공통 스타일 속성 추가 가능 */
    & > .card-body {
        height: inherit;
        & > .card-title {
        }
        & > .card-text {
            margin: 0;
        }
    }
`


const StyledSearchListItem = styled(ListGroup.Item)<{justifyContent?:string}>`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const StyledeBtnWrapper = styled.div`
    display: flex;
    gap: 10px; 
`

const StyledColseBtn = styled(CloseButton)`
    position: absolute;
    top: 5px;
    right: 5px;
`

const StyledDirectionBtn = styled(Button)<{width?:string}>`
    padding: 5px;
    font-size: 12px;
    margin-right:10px;
    margin-top: 5px;
    width: ${({width}) => width};
`

const StyledCurrentPlaceDiv = styled.div<{ background?: string, }>`
    background: ${props =>
        props?.background ? props.background : 'white'};
    color: ${props =>
        props?.background ? 'white' : 'black'};;
    padding: 5px 10px;
    border-radius: 30px;
`

const StyledErrorMsg = styled.h4`
    text-align: center;
`

const StyledFormControl = styled(Form.Control)<{width?: string, marginRight?: string}>`
    width : ${({width}) => width};
    margin-top : 10px;
    resize: none;
    /* margin-right: 10px; */
`


export default PlanMap
