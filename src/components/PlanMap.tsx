import React , {useState} from 'react'
import { Map } from 'react-kakao-maps-sdk';
import OverlayWrapper from './shared/OverlayWrapper';
import DaumPostcode from "react-daum-postcode";
import { getData } from '../util/api/apiInstance';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { kakaoAddressInfoState } from '../state/kakaoAddressInfo';

const PlanMap = () => {
    const [{lat, lng, address_name, region_2depth_name}, setAddressInfo] = useRecoilState(kakaoAddressInfoState)
    const handleComplete = async (data: any) => {
        const searchTxt = data.address; // 검색한 주소
        console.log(searchTxt, '이거뭐야');
        const config = { headers: {Authorization : `KakaoAK ${process.env.REACT_APP_KAKAOREST_KEY}`}}; // 헤더 설정
        const url = 'https://dapi.kakao.com/v2/local/search/address.json?query='+searchTxt; // REST API url에 data.address값 전송
        axios.get(url, config).then(function(result) { // API호출
            if(result.data !== undefined || result.data !== null){
                console.log(result);
                if(result.data.documents[0].x && result.data.documents[0].y) {
                      // Kakao Local API로 검색한 주소 정보 및 위도, 경도값 저장 
                        setAddressInfo({
                            address_name: result.data.documents[0].address.address_name,
                            region_2depth_name: result.data.documents[0].address.region_2depth_name,
                            lat: Number(result.data.documents[0].x),
                            lng: Number(result.data.documents[0].y),
                        })
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
            </Map>
            {/* <Modal
                onOk={onToggleModal}
                onCancel={onToggleModal} // isOpen이 false가 되고 화면이 리렌더되면서 모달이 뜨지 않는다.
            > */}
            <DaumPostcode onComplete={handleComplete} />
            {/* </Modal> */}
        </OverlayWrapper>
    );
        
}

export default PlanMap
