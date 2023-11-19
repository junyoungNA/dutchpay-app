import KakaoLogin from "react-kakao-login";
import { useRecoilState, useResetRecoilState } from "recoil";
import { kakaoUser } from "../state/kakaoUser";
import styled from "styled-components";
import {  postData } from "../util/api/apiInstance";
import { StyledButtonWrapper } from "../aseets/styled/ButtonWrapper";
import { Image } from "react-bootstrap"; 
import showAlert from "../util/shoAlert";
// import Cookies from 'js-cookie';


const SocialKakao = () => {
    const  [user,setUser] = useRecoilState(kakaoUser);
    const  resetKakaoUSer = useResetRecoilState(kakaoUser);
    const kakaoClientId = process.env.REACT_APP_API_KEY!;
    // getKakaoToken으로 토큰을 가져온 후,(kakaoLogin을 통해 한번에 토큰까지 가져오므로 패스)
    // getKakaoInfo로 토큰에 담긴 사용자 ID를 읽어온다. // 이부분은 백엔드에서 해야함!
    // 그리고 해당 ID로 DB에 접근하여 새로운 계정을 생성하거나 
    // 기존 계정을 가져와 프론트엔드로 전달한다.

    const kakaoOnSuccess = async (data : any)=> {
        try {
            const {access_token, refresh_token, expires_in, refresh_token_expires_in } = data.response;
            const idUser= data.profile.id
            const nickname = data.profile.properties.nickname;

            const response: any = await postData('user',{nickname, idUser, refresh_token, access_token, expires_in, refresh_token_expires_in});
            // console.log(response, '로그인 결과');
            if(!response.idUser) showAlert('카카오 로그인 오류');
        
            localStorage.setItem(process.env.REACT_APP_ACCESS_TOKEN as string, response.token);
            setUser({nickname: response.nickname, idUser : response.idUser,  });
        } catch (error) {
            showAlert('로그인 오류');
            console.log(error);
        }
    }

    const kakaoLogout = async (data : any) => {
        try {
            // console.log(data,'가져온 데이터정보');
            // const accessToken = data.response.access_token; // 엑세스 토큰 백엔드로 전달
            // const idUser = data.profile.id; // 엑세스 토큰 백엔드로 전달
            // const nickname = data.profile.properties.nickname; //kakao 유저 닉네임
            // const result: any = await postData('user',{accessToken, nickname , idUser});
            localStorage.removeItem('accessToken');
            resetKakaoUSer();
        } catch (error) {
            console.log(error);
        }
    }

    const kakaoOnFailure = (error :any) => {
        console.log(error);
        alert('카카오 로그인 에러발생')
    };

    return(
        <StyledButtonWrapper background="#fef01b">
                <StyledKakao
                    token={kakaoClientId}
                    onSuccess={kakaoOnSuccess}
                    onFail={kakaoOnFailure}
                    onLogout={kakaoLogout}
                >
                {user.idUser !== '' && user.nickname !== undefined ? `카카오 로그아웃` : '카카오 로그인'}
                </StyledKakao>
            <StyledImage src='./images/kakao.png' alt='카카오 이미지'/>
        </StyledButtonWrapper>
    )
}

const StyledKakao = styled(KakaoLogin) `
    font-weight: 900;
    box-sizing: border-box;
    width: 300px !important;
    border-radius: 15px !important;
    position: absolute;
    bottom: 2px;
    background:none !important;
    cursor: pointer;
`

const StyledImage = styled(Image) `
    width: 40px;
    height: 40px;
    object-fit: fill;
    border-radius: 100%;
    background-color: none;
    position: absolute;
    left: 10px;
    z-index: 999;
    pointer-events: none;
`

export default SocialKakao
