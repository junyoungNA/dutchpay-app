import { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';
import { IKakaoAddressInfo } from '../atom/kakaoAddressInfo';
import { IMarkers } from '../components/plan/PlanMap';

interface IUseKakaoSearchProps {
    markerInfo : any,
    setMarkers : Dispatch<SetStateAction<IMarkers[]>>;
}

export const useKakaoSearch = ({ setMarkers, markerInfo} : IUseKakaoSearchProps )  => {
    const [searchList, setSearchList] = useState<IKakaoAddressInfo[]>([]);
    const [map, setMap] = useState<any>();

    const kakaoKeywordSearch = useCallback((keyword : string) => {
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
    }, [map, setMarkers])

    useEffect (() => {
        if(!map) return;
        if(!markerInfo)kakaoKeywordSearch('서울역');
    }, [map, markerInfo, kakaoKeywordSearch])

    return { searchList, kakaoKeywordSearch, map, setMap };
};

export default useKakaoSearch;
