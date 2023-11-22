import {atom} from 'recoil';
import { recoilPersist } from 'recoil-persist';

export type TKakaoUser = {
    nickname : string,
    idUser : string,
}

const { persistAtom: persistKakaoUser } = recoilPersist({
  key: 'kakaoUserPersist', // kakaoUser를 위한 고유한 키
});

export const kakaoUser = atom({
    key: 'kakaoUser', // unique ID (with respect to other atoms/selectors)
    default: {}  as TKakaoUser, // default value (aka initial value)
    effects_UNSTABLE: [persistKakaoUser], //새로고침되도 유저정보유지!
});