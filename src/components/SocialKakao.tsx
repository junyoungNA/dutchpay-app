import KakaoLogin from "react-kakao-login";
import { useRecoilState } from "recoil";
import { kakaoUser } from "../state/kakaoUser";
import styled from "styled-components";
import { postData } from "../util/api/apiInstance";
import { StyledButtonWrapper } from "../aseets/styled/ButtonWrapper";
import { Image } from "react-bootstrap";
import { useEffect, useState } from "react";
import showAlert from "../util/shoAlert";
import Cookies from "universal-cookie";

const SocialKakao = () => {
    const [isLogin, setIsLogin] = useState(false); //카카오 로그인 버튼 마우스이벤트
    const cookies = new Cookies();
    const  [user,setUser] = useRecoilState(kakaoUser);
    const kakaoClientId = process.env.REACT_APP_API_KEY!;

    
    const kakaoOnSuccess = async (data : any)=> {
        try {
            console.log(data,'가져온 데이터정보');
            cookies.set("kakaoAccess", data.response.access_token, {
                path: "/",
                maxAge: 60 * 60 * 24 * 30,
            })
            const accessToken = data.response.access_token; // 엑세스 토큰 백엔드로 전달
            const refreshToken = data.response.refresh_Token; // 엑세스 토큰 백엔드로 전달
            const idUser = data.profile.id; // 엑세스 토큰 백엔드로 전달
            const nickname = data.profile.properties.nickname; //kakao 유저 닉네임
            const result: any = await postData('user',{accessToken, nickname , idUser});
            localStorage.setItem('kakaoUserId', idUser);
            if(!result) showAlert('로그인 오류');
            setUser({nickname, idUser, refreshToken,accessToken });
        } catch (error) {
            showAlert('로그인 오류');
            console.log(error);
        }
    }

    const kakaoLogout = async (data : any) => {
        try {
            console.log(data,'가져온 데이터정보');
            // const accessToken = data.response.access_token; // 엑세스 토큰 백엔드로 전달
            // const idUser = data.profile.id; // 엑세스 토큰 백엔드로 전달
            // const nickname = data.profile.properties.nickname; //kakao 유저 닉네임
            // const result: any = await postData('user',{accessToken, nickname , idUser});
            localStorage.removeItem('kakaoUserId');
            setUser({ nickname: '', idUser: '' });
            setIsLogin((prev) => false);
            console.log('로그아웃',isLogin);
        } catch (error) {
            console.log(error);
        }
    }

    const kakaoOnFailure = (error :any) => {
        console.log(error);
        alert('카카오 로그인 에러발생')
    };

    // const onRouteBtnMouseInoutHandler = (isEnter : boolean) => {
    //     setIsHovered(isEnter);
    // }

    return(
        <StyledButtonWrapper background="#fef01b">
                <StyledKakao
                    token={kakaoClientId}
                    onSuccess={kakaoOnSuccess}
                    onFail={kakaoOnFailure}
                    onLogout={kakaoLogout}
                >
                {user.idUser !== '' && user.nickname !== undefined ? `${user.nickname}님 환영해요~` : '카카오로 로그인'}
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
