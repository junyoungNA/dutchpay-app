import React , {useEffect, useState} from 'react'
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import OverlayWrapper from './shared/OverlayWrapper';
import DaumPostcode from "react-daum-postcode";
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { IKakaoAddressInfo, kakaoAddressInfoState } from '../state/kakaoAddressInfo';
import { Col, Row, Button, Tabs, Tab, Form } from 'react-bootstrap';
import styled from 'styled-components';

type TMarkers  = {
    lat: string,
    lng : string,
} 

interface IMarkers {
    position? : TMarkers;
}

const PlanMap = () => {
    const [{x, y, address_name, region_2depth_name}, setAddressInfo] = useRecoilState(kakaoAddressInfoState);
    const [searchList, setSearchList] = useState<IKakaoAddressInfo[] >([]);
    const [zoomable, setZoomable] = useState(true) //zoom 막기
    const [markers, setMarkers] = useState<IMarkers[]>([]);
    const [map, setMap] = useState<any>();
    const [info, setInfo] = useState<any>();
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
                for (let i = 0; i < data.length; i++) {
                // @ts-ignore
                    markers.push({
                        position: {
                            lat: data[i].y,
                            lng: data[i].x,
                        },
                        content: data[i].place_name,
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
        // axios.get(url, config).then(function(result) { // API호출
        //     if(result.data !== undefined || result.data !== null){
        //         if(result.data.documents[0].x && result.data.documents[0].y) {
        //               // Kakao Local API로 검색한 주소 정보 및 위도, 경도값 저장 
        //             const addressInfo = {
        //                 address_name: result.data.documents[0].address.address_name,
        //                 region_2depth_name: result.data.documents[0].address.region_2depth_name,
        //                 y: Number(result.data.documents[0].y),//위도
        //                 x: Number(result.data.documents[0].x)};

        //                 setAddressInfo(addressInfo);
        //                 setSerachList((prev) => [...prev, addressInfo]);
        //                 // setShowPostcode(false);
        //             }
        //         }
        //     })
    };

    const onClickSerachRecord = (addressInfo : IKakaoAddressInfo)  => () => {
        const markerInfo = {position: {lat : addressInfo.y, lng:addressInfo.x}, content : addressInfo.place_name}
        setAddressInfo(addressInfo);
        setInfo(markerInfo);
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
                        <MapMarker
                            key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
                            position={marker.position}
                            onClick={() => setInfo(marker)}
                            >
                            {info &&info.content === marker.content && (
                                <div style={{color:"#000"}}>{marker.content}</div>
                            )}
                        </MapMarker>
                ))}
                    <Button onClick={() => setZoomable(false)}>지도 확대/축소 끄기</Button>{" "}
                    <Button onClick={() => setZoomable(true)}>지도 확대/축소 켜기</Button>
                </StyledPlanMap>
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
                    </Tab>
                    <Tab eventKey="location" title="장소 검색">
                        <DaumPostcode onComplete={handleComplete} autoClose={false}  style={{height:'350px'}}/>
                    </Tab>
                    </Tabs>
                </StyledPlanCol>
            </StyledPlanRow>
            <ul>
                {searchList?.map((addressInfo) => 
                    <li onClick={onClickSerachRecord(addressInfo)}>{addressInfo.address_name}</li>
                )}
            </ul>
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



export default PlanMap
