import {atom} from 'recoil';

type TypekakaoUser = {
    nickname : string,
    idUser : string,
    accessToken? : string,
    refreshToken? : string,
}

export const kakaoUser = atom({
    key: 'kakaoUser', // unique ID (with respect to other atoms/selectors)
    default: {}  as TypekakaoUser, // default value (aka initial value)
});