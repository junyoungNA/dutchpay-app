import {atom} from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();


export type TKakaoUser = {
    nickname : string,
    idUser : string,
    // accessToken : string,
    // refreshToken : string,
    // expiresIn : string,
    // refreshTokenExpiresIn : string
    
}

export const kakaoUser = atom({
    key: 'kakaoUser', // unique ID (with respect to other atoms/selectors)
    default: {}  as TKakaoUser, // default value (aka initial value)
    effects_UNSTABLE: [persistAtom], //새로고침되도 유저정보유지!
});