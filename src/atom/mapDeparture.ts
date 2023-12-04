import {atom} from 'recoil';

// 길찾기에 사용될 map 도착지 정보
export const mapDeparture = atom({
    key: 'mapDeparture', 
    default: '',
});