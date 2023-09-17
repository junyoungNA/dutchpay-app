import React from 'react'
import { Map } from 'react-kakao-maps-sdk';
import OverlayWrapper from './shared/OverlayWrapper';

const PlanMap = () => {
    return (
        <OverlayWrapper>
            <Map 
                center={{ lat: 33.5563, lng: 126.79581 }}   // 지도의 중심 좌표
                style={{ width: '800px', height: '600px' }} // 지도 크기
                level={3}                                   // 지도 확대 레벨
                >
            </Map>
        </OverlayWrapper>
    );
        
}

export default PlanMap
