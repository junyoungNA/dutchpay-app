const axios = require('axios');
const refreshKakaoToken = async (req, token) => {
    const { KAKAO_API } = process.env;
    const url = 'https://kauth.kakao.com/oauth/token';
    const params = {
        grant_type: 'refresh_token',
        client_id: KAKAO_API,
        refresh_token: token,
    };
    try {
        const response = await axios.post(url, null, {
            params,
            headers: {
            'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
            },
        });
        const {
            access_token,
            expires_in,
            refresh_token,
            refresh_token_expires_in,
        } = response.data;
        console.log(response,'refresh api결과');
        // 액세스 토큰 갱신
        req.cookies.set('accessToken', access_token);
        req.cookies.set('expireIn', Date.now() + expires_in * 1000);

    // 만약 새로운 리프레쉬 토큰이 발급된 경우 리프레쉬 토큰도 갱신
    if (refresh_token) {
        req.cookies.set('refreshToken', refresh_token);
        req.cookies.set(
            'refreshTokenExpiresIn',
            Date.now() + refresh_token_expires_in * 1000,
        );}
        
    } catch (e) {
    console.error(e);
    }
};