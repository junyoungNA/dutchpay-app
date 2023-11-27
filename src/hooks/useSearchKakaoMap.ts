// src/hooks/useKakaoSearch.ts
import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { useRecoilState, useRecoilValue } from 'recoil';
import { IKakaoAddressInfo, kakaoAddressInfoState } from '../atom/kakaoAddressInfo';
import { currentKakaoMap } from '../atom/currentKakaoMap';

type TMarkers  = {
    lat: string,
    lng : string,
} 

interface IMarkers {
    position? : TMarkers;
}

export const useKakaoSearch = () => {

    const currentMap = useRecoilValue(currentKakaoMap);
    const [_,setAddressInfo] = useRecoilState(kakaoAddressInfoState);
    const [searchList, setSearchList] = useState<IKakaoAddressInfo[]>([]);
    const [markers, setMarkers] = useState<IMarkers[]>([]);


    const kakaoKeywordSearch = useCallback((keyword: string, currentMap: any) : void => {
        const ps = new kakao.maps.services.Places();
        ps.keywordSearch(keyword, (data: any, status: any, _pagination: any) => {
            if (status === kakao.maps.services.Status.OK) {
                 // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
                // LatLngBounds 객체에 좌표를 추가합니다
                const bounds = new kakao.maps.LatLngBounds();
                const markers: any = [];

                for (let i = 0; i < data.length; i++) {
                    markers.push({
                        ...data[i],
                        position: {
                            lat: data[i].y,
                            lng: data[i].x,
                        }
                    });
                    bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
                }
                setMarkers(markers);
                // setAddressInfo(addressInfo);
                setSearchList(data);
                // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
                currentMap.setBounds(bounds);
                console.log(currentMap, '맵은뭐냐');
            }
        });
    },[currentMap]);

    useEffect (() => {
        if(!currentMap) return;
        kakaoKeywordSearch('서울역', currentMap);
    }, [currentMap ,kakaoKeywordSearch])

    const kakaoAddressSearch = async (data: any) : Promise<void> => {
        const searchTxt = data.address;
        const config = { headers: { Authorization: `KakaoAK ${process.env.REACT_APP_KAKAOREST_KEY}` } };
        const url = 'https://dapi.kakao.com/v2/local/search/address.json?query=' + searchTxt;

        try {
            const result = await axios.get(url, config);
            if (result.data.documents !== undefined && result.data.documents !== null) {
                if (result.data.documents[0].x && result.data.documents[0].y) {
                    // Kakao Local API로 검색한 주소 정보 및 위도, 경도값 저장 
                    const bounds = new kakao.maps.LatLngBounds();
                    const markers: any = [];
                    const addressInfo = {
                        place_name: result.data.documents[0].address.address_name,
                        road_address_name: result.data.documents[0].road_address.address_name,
                        y: Number(result.data.documents[0].y),
                        x: Number(result.data.documents[0].x),
                        position: { lat: Number(result.data.documents[0].y), lng: Number(result.data.documents[0].x) },
                    };

                    bounds.extend(new kakao.maps.LatLng(result.data.documents[0].y, result.data.documents[0].x));
                    markers.push(addressInfo);
                    setMarkers(markers);
                    setAddressInfo(addressInfo);
                     // map.setBouds(bounds)를 통해 바뀐맵에 정보를 넣어야함
                    currentMap.bounds.setBounds(bounds);
                }
            }
        } catch (error) {
            console.error(error);
        }
    };

    return { searchList, markers, setMarkers, kakaoKeywordSearch, kakaoAddressSearch };
};

export default useKakaoSearch;
