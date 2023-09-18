import React , {useState} from 'react'
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import OverlayWrapper from './shared/OverlayWrapper';
import DaumPostcode from "react-daum-postcode";
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { IKakaoAddressInfo, kakaoAddressInfoState } from '../state/kakaoAddressInfo';

const PlanMap = () => {
    const [{lat, lng, address_name, region_2depth_name}, setAddressInfo] = useRecoilState(kakaoAddressInfoState);
    const [showPostcode, setShowPostcode] = useState(true); // DaumPostcode 컴포넌트를 보여줄지 여부
    const [searchList, setSerachList] = useState<IKakaoAddressInfo[]>([]);
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
    return (
        <OverlayWrapper>
            <Map 
                center={{ lat: lat, lng: lng }}   // 지도의 중심 좌표
                style={{ width: '800px', height: '600px' }} // 지도 크기
                level={3}                                   // 지도 확대 레벨
                >
                <MapMarker
                    position={{
                        // 인포윈도우가 표시될 위치입니다
                        lat: lat,
                        lng: lng,
                    }}
                >
                    <span>{address_name}</span>
                </MapMarker>
            </Map>
            {showPostcode && (
                <DaumPostcode onComplete={handleComplete} autoClose={false} />
            )}
            <ul>
                {searchList?.map(({address_name,lat,region_2depth_name,lng}) => 
                    <li>{address_name}</li>
                )}
            </ul>
        </OverlayWrapper>
    );
        
}

export default PlanMap
