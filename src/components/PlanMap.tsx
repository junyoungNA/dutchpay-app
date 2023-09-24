import  {useEffect, useState} from 'react'
import { Map, MapMarker,CustomOverlayMap } from 'react-kakao-maps-sdk';
import OverlayWrapper from './shared/OverlayWrapper';
import DaumPostcode from "react-daum-postcode";
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { IKakaoAddressInfo, kakaoAddressInfoState } from '../state/kakaoAddressInfo';
import { Col, Row, Button, Tabs, Tab, Form,ListGroup, Card, CloseButton  } from 'react-bootstrap';
import styled from 'styled-components';

type TMarkers  = {
    lat: string,
    lng : string,
} 

interface IMarkers {
    position? : TMarkers;
}

const PlanMap = () => {
    const [{x, y, address_name, region_2depth_name, place_name, road_address_name}, setAddressInfo] = useRecoilState(kakaoAddressInfoState);
    const [searchList, setSearchList] = useState<IKakaoAddressInfo[] >([]);
    const [zoomable, setZoomable] = useState(true) //zoom 막기
    const [markers, setMarkers] = useState<IMarkers[]>([]);
    const [map, setMap] = useState<any>();
    const [markerInfo, setMarkerInfo] = useState<any>({});
    const [departure, setDeparture] = useState(''); // 출발지
    const [arrive, setArrive] = useState(''); //도착지
    const [keyword, setKeyword] = useState('서울역');

    useEffect(() => {
        if (!map) return
        kakaoKewordSerach();
    }, [map])
    

    const kakaoKewordSerach = () => {
        const ps = new kakao.maps.services.Places()
        ps.keywordSearch(keyword, (data:any, status, _pagination) => {
            if (status === kakao.maps.services.Status.OK) {
                // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
                // LatLngBounds 객체에 좌표를 추가합니다
                const bounds = new kakao.maps.LatLngBounds()
                const markers : any= [];
                // console.log(data, '가져온 데이터');
                for (let i = 0; i < data.length; i++) {
                // @ts-ignore
                    markers.push({
                        ...data[i],
                        position: {
                            lat: data[i].y,
                            lng: data[i].x,
                        }
                    })
                // @ts-ignore
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
                    console.log(result.data,'검색어 입력');
                    const markers : any= [];
                    const addressInfo = {
                        address_name: result.data.documents[0].address.address_name,
                        road_address_name :result.data.documents[0].road_address.address_name,
                        region_2depth_name: result.data.documents[0].address.region_2depth_name,
                        y: Number(result.data.documents[0].y),//위도
                        x: Number(result.data.documents[0].x),
                        position : {lat : Number(result.data.documents[0].y), lng: Number(result.data.documents[0].x)},
                    };
                        markers.push(addressInfo)
                        setMarkers(markers);
                        setAddressInfo(addressInfo);
                        setSearchList((prev) => [...prev, addressInfo]);
                        // setShowPostcode(fxalse);
                    }
                }
        })
    };

    const onClickSerachRecord = (addressInfo : IKakaoAddressInfo)  => () => {
        setAddressInfo(addressInfo);
        setMarkerInfo(addressInfo);
    }
    return (
        <OverlayWrapper>
            <StyledPlanRow padding={'auto'}>
                <StyledPlanCol xs={12} md={6}>
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
                                    {markerInfo && markerInfo.place_name === marker.place_name && (
                                        <CustomOverlayMap position={marker.position} >
                                            <StyledMapCard>
                                                <Card.Body >
                                                    <StyledColseBtn onClick={() => setMarkerInfo(null)}/>
                                                    <Card.Title>{markerInfo.place_name}</Card.Title>
                                                    <Card.Text>{markerInfo.road_address_name}</Card.Text>
                                                    <Card.Text>{markerInfo.address_name}</Card.Text>
                                                    <StyledDirectionBtn variant="secondary" onClick={() => setDeparture(markerInfo.place_name)}>출발지로 설정</StyledDirectionBtn>
                                                    <StyledDirectionBtn variant="danger" onClick={() => setArrive(markerInfo.place_name)}>도착지로 설정</StyledDirectionBtn>
                                                    <Card.Link href={`https://map.kakao.com/?sName=${departure}&eName=${arrive}`} target={"_blank"} >
                                                        <StyledDirectionBtn variant="success" >
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
                        <Button onClick={() => setZoomable(true)}>지도 확대/축소 켜기</Button>
                    </StyledPlanMap>
                    {departure && <div> 출발지 : {departure}</div>}
                    {arrive && <div> 도착지 : {arrive}</div>}
                </StyledPlanCol>
                <StyledPlanCol xs={12} md={4}>
                <Tabs
                    defaultActiveKey="category"
                    id="uncontrolled-tab-example"
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
                                <ListGroup.Item action key={addressInfo.id} onClick={onClickSerachRecord(addressInfo)}>{addressInfo.place_name}
                                    <StyledDirectionBtn variant="secondary" onClick={() => setDeparture(addressInfo?.place_name)}>출발지</StyledDirectionBtn>
                                    <StyledDirectionBtn variant="danger" onClick={() => setArrive(addressInfo?.place_name)}>도착지</StyledDirectionBtn>
                                </ListGroup.Item>
                            )}
                        </ListGroup>                    
                    </Tab>
                    <Tab eventKey="location" title="장소 검색">
                        <DaumPostcode onComplete={handleComplete} autoClose={false}  style={{height:'350px'}}/>
                    </Tab>
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

const StyledColseBtn = styled(CloseButton)`
    position: absolute;
    top: 5px;
    right: 5px;
`


const StyledDirectionBtn = styled(Button)`
    padding: 5px;
    font-size: 10px;
    margin-right:10px;
    margin-top: 5px;
`


export default PlanMap
