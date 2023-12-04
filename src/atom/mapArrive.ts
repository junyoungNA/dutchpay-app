import {atom} from 'recoil';

// 길찾기에 사용될 map 출발지 정보
export const mapArrive = atom({
    key: 'mapArrive', 
    default: '',
});