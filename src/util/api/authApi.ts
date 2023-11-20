import { AxiosRequestConfig } from "axios";
import { getData } from "./apiInstance";

//카카오유저 정보 받아오기
export const getKakaoUserInfo = async () => {
    //여기서 쿠키set을 통해 백엔드로 보내는건 좋지않은 것 같음.
    //애초에 state 에도 token에 대한 정보를 담는게 좋을 방법일까?

    // const {accessToken, expiresIn, refreshToken, refreshTokenExpiresIn} = userInfo;
    // const token = localStorage.getItem(process.env.REACT_APP_ACCESS_TOKEN as string);
    // if (!token) {
    //     throw new Error('Kakao access token not found');
    // }

    // const headers = {
    //     'Authorization': `Bearer ${token}`,
    //     'Content-Type': 'application/json',
    // };

    const config: AxiosRequestConfig = {
        // headers: headers,
        withCredentials : true, //쿠키에 설정된 token 데이터들을 보내기위한 설정
    };
    try {
        const result: any = await getData(`user`, config);
        return result;
    }catch (error) {
        console.error('Error fetching Kakao user info:', error);
        return error
    }
}