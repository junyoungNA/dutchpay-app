const axios = require('axios');
const jwt = require('jsonwebtoken');

const getKakaoToken = async (req, token) => {
    // console.log(req.cookies, token, '토큰정보보여줘');
    const { KAKAO_API_KEY } = process.env;
    const url = 'https://kauth.kakao.com/oauth/token';
    const params = {
        grant_type: 'refresh_token',
        client_id: KAKAO_API_KEY,
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

        const newToken = jwt.sign({orginToken: access_token }, process.env.JWT_SECRET, {
            expiresIn: '1h', // 토큰 유효 기간 설정 (예: 1시간)
        });
        
        return  {newToken, expires_in, refresh_token, refresh_token_expires_in}
    } catch (e) {
    console.error(e);
    }
};

module.exports = { getKakaoToken };