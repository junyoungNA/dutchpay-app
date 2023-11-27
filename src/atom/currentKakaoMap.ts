import {atom} from 'recoil';

// 카카오 맵 현재 정보를 담기위한 전역상태

export const currentKakaoMap = atom({
    key: 'currentKakaoMap', // unique ID (with respect to other atoms/selectors)
    default: {} as any,
});