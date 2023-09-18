import React , {useState} from 'react'
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import OverlayWrapper from './shared/OverlayWrapper';
import DaumPostcode from "react-daum-postcode";
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { IKakaoAddressInfo, kakaoAddressInfoState } from '../state/kakaoAddressInfo';
import { Col, Row } from 'react-bootstrap';
import styled from 'styled-components';

const PlanMap = () => {
    const [{lat, lng, address_name, region_2depth_name}, setAddressInfo] = useRecoilState(kakaoAddressInfoState);
    const [searchList, setSerachList] = useState<IKakaoAddressInfo[]>([]);
    const [zoomable, setZoomable] = useState(true) //zoom 막기

    const handleComplete = async (data: any) => {
        const searchTxt = data.address; // 검색한 주소
        const config = { headers: {Authorization : `KakaoAK ${process.env.REACT_APP_KAKAOREST_KEY}`}}; // 헤더 설정
        const url = 'https://dapi.kakao.com/v2/local/search/address.json?query='+searchTxt; // REST API url에 data.address값 전송
        axios.get(url, config).then(function(result) { // API호출
            if(result.data !== undefined || result.data !== null){
                console.log(result);
                if(result.data.documents[0].x && result.data.documents[0].y) {
                      // Kakao Local API로 검색한 주소 정보 및 위도, 경도값 저장 
                    const addressInfo = {
                        address_name: result.data.documents[0].address.address_name,
                        region_2depth_name: result.data.documents[0].address.region_2depth_name,
                        lat: Number(result.data.documents[0].y),//위도
                        lng: Number(result.data.documents[0].x)};

                        setAddressInfo(addressInfo);
                        setSerachList((prev) => [...prev, addressInfo]);
                        // setShowPostcode(false);
                    }
                }
            })
    };

    const onClickSerachRecord = (addressInfo : IKakaoAddressInfo)  => () => {
        setAddressInfo(addressInfo);
    }
    return (
        <OverlayWrapper>
            <StyledPlanRow padding={'auto'}>
                <StyledPlanCol xs={12} md={6}>
                <StyledPlanMap 
                    center={{ lat: lat, lng: lng }}   // 지도의 중심 좌표
                    level={3}// 지도 확대 레벨
                    zoomable={zoomable}
                    >
                    <MapMarker
                        position={{
                            // 인포윈도우가 표시될 위치입니다
                            lat: lat,
                            lng: lng,
                        }}
                    >
                        {address_name !== '' && <span>{address_name}</span>}
                    </MapMarker>
                    <button onClick={() => setZoomable(false)}>지도 확대/축소 끄기</button>{" "}
                    <button onClick={() => setZoomable(true)}>지도 확대/축소 켜기</button>
                </StyledPlanMap>
                </StyledPlanCol>
                <StyledPlanCol xs={12} md={4}>
                    <DaumPostcode onComplete={handleComplete} autoClose={false}  style={{height:'350px'}}/>
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
