import KakaoLogin from "react-kakao-login";
import { useRecoilState } from "recoil";
import { kakaoUser } from "../state/kakaoUser";
import {Image } from 'react-bootstrap';
import styled from "styled-components";
import { postData } from "../util/api/apiInstance";

const SocialKakao = () => {
    const  [user,setUser] = useRecoilState(kakaoUser);
    const kakaoClientId = process.env.REACT_APP_API_KEY!;
    
    const kakaoOnSuccess = async (data : any)=> {
        try {
            console.log(data);
            const accessToken = data.response.access_token; // 엑세스 토큰 백엔드로 전달
            const idUser = data.profile.id; // 엑세스 토큰 백엔드로 전달
            const nickname = data.profile.properties.nickname; //kakao 유저 닉네임
            setUser({nickname, idUser });
            const result = await postData('user',{accessToken, nickname , idUser});
            // console.log(result);
            // navigate(ROUTES.CREATE_GROUP);
        } catch (error) {
            console.log(error);
        }
    }

    const kakaoOnFailure = (error :any) => {
        console.log(error);
    };

    return(
        <StyledKakaoDiv>
            {!user.nickname ? 
                <StyledKakao
                    token={kakaoClientId}
                    onSuccess={kakaoOnSuccess}
                    onFail={kakaoOnFailure}
                    // onLogout={responseKaKao}
                />
            :  
                <span>{user.nickname} 님 환영해요~!</span>
            }
            <StyledImage src='./images/kakao.png' alt='카카오 이미지'/>
        </StyledKakaoDiv>
    )
}


const StyledKakaoDiv = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 15px;
    font-weight:800;
    font-size: 18px;
    background:#fef01b;
    height: 50px;
    margin-left: 20px;
    width: 300px;
    padding-left: 10px;
    box-sizing: border-box;
`

const StyledKakao = styled(KakaoLogin) `
    font-weight: 900;
    box-sizing: border-box;
    width: 300px !important;
    border-radius: 15px !important;
    position: absolute;
    cursor: pointer;
;
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
