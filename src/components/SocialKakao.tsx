import KakaoLogin from "react-kakao-login";
import { useRecoilState } from "recoil";
import { kakaoUser } from "../state/kakaoUser";
import styled from "styled-components";
import { postData } from "../util/api/apiInstance";
import { StyledButtonWrapper } from "../aseets/styled/ButtonWrapper";
import { Image } from "react-bootstrap";
import { useState } from "react";

const SocialKakao = () => {
    const [isHovered, setIsHovered] = useState(false); //카카오 로그인 버튼 마우스이벤트

    const  [user,setUser] = useRecoilState(kakaoUser);
    const kakaoClientId = process.env.REACT_APP_API_KEY!;

    const showAlert = (msg : string) => {
        alert(msg);
    }
    
    const kakaoOnSuccess = async (data : any)=> {
        try {
            // console.log(data,'가져온 데이터정보');
            const accessToken = data.response.access_token; // 엑세스 토큰 백엔드로 전달
            const idUser = data.profile.id; // 엑세스 토큰 백엔드로 전달
            const nickname = data.profile.properties.nickname; //kakao 유저 닉네임
            const result: any = await postData('user',{accessToken, nickname , idUser});
            localStorage.setItem('kakaoUserId', idUser);
            if(!result) showAlert('로그인 오류');
            setUser({nickname, idUser });
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
            console.log('로그아웃');
        } catch (error) {
            console.log(error);
        }
    }

    const kakaoOnFailure = (error :any) => {
        console.log(error);
        alert('카카오 로그인 에러발생')
    };

    const onRouteBtnMouseInoutHandler = (isEnter : boolean) => {
        setIsHovered(isEnter);
    }

    return(
        <StyledButtonWrapper background="#fef01b">
            <StyledKakaoLoginBtn 
                onMouseEnter={() => onRouteBtnMouseInoutHandler(true)}
                onMouseLeave={() => onRouteBtnMouseInoutHandler(false)}
            >
                {!user.nickname ? 
                    <StyledKakao
                    token={kakaoClientId}
                    onSuccess={kakaoOnSuccess}
                    onFail={kakaoOnFailure}
                    onLogout={kakaoLogout}
                />
                :  
                <span>{isHovered ? '카카오 로그아웃' : `${user.nickname}님 환영해요~!`}</span>
                }
            </StyledKakaoLoginBtn>
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

const StyledKakaoLoginBtn = styled.button`
    background-color: inherit;
    border: none;
    font-weight: 900;
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
