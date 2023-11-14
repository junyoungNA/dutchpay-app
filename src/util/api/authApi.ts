import { AxiosRequestConfig } from "axios";
import Cookies from "universal-cookie";
import { getData } from "./apiInstance";

export const cookies = new Cookies();

//카카오유저 정보 받아오기
export const getKakaoUserInfo = async (token : string) => {
    
    // 만약 accessToken이 존재하지 않으면 에러 처리
    if (!token) {
        throw new Error('Kakao access token not found');
    }

    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
    };

    const config: AxiosRequestConfig = {
        headers: headers,
    };

    try {
        const result: any = await getData(`https://kapi.kakao.com/v2/user/me`, config);
        return result;
    }catch (error) {
        console.error('Error fetching Kakao user info:', error);
    }
}