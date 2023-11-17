import { AxiosRequestConfig } from "axios";
import Cookies from "universal-cookie";
import { getData } from "./apiInstance";
import { TKakaoUser } from "../../state/kakaoUser";

export const cookies = new Cookies();

//카카오유저 정보 받아오기
export const getKakaoUserInfo = async (userInfo : TKakaoUser) => {
    // 만약 accessToken이 존재하지 않으면 에러 처리
    const {accessToken, expiresIn, refreshToken, refreshTokenExpiresIn} = userInfo;
    // const token = localStorage.getItem(process.env.REACT_APP_ACCESS_TOKEN as string);
    // console.log(token, '현재token');
    console.log(userInfo, '현재userInfo');
    if (!accessToken || !expiresIn) {
        throw new Error('Kakao access token not found');
    }

    cookies.set('accessToken', accessToken, { path: '/', sameSite: 'none', secure: true });
    cookies.set('expiresIn', expiresIn, { path: '/', sameSite: 'none', secure: true });
    cookies.set('refreshToken', refreshToken, { path: '/', sameSite: 'none', secure: true });
    cookies.set('refreshTokenExpiresIn', refreshTokenExpiresIn, { path: '/', sameSite: 'none', secure: true })

    const headers = {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
    };

    const config: AxiosRequestConfig = {
        headers: headers,
        withCredentials : true, //쿠키에 설정된 token 데이터들을 보내기위한 설정
    };

    try {
        const result: any = await getData(`user`, config);
        return result;
    }catch (error) {
        console.error('Error fetching Kakao user info:', error);
    }
}