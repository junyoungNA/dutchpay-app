import {atom} from 'recoil';

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
});