import KakaoLogin from "react-kakao-login";
import { useRecoilState } from "recoil";
import { kakaoUser } from "../state/kakaoUser";
import {Image } from 'react-bootstrap';
import styled from "styled-components";
import { postData } from "../util/api/apiInstance";
import {useNavigate} from 'react-router-dom';
import { ROUTES } from "../route/routes";
import {useRef} from 'react';

const SocialKakao = () => {
    const  navigate = useNavigate();
    const  [user,setUser] = useRecoilState(kakaoUser);
    const kakaoClientId = process.env.REACT_APP_API_KEY!;
    const kakaoRef: React.RefObject<KakaoLogin> = useRef<KakaoLogin>(null);

    const handleKakaoDivClick = () => {
        // StyledKakaoDiv가 클릭되면 KakaoLogin 컴포넌트를 클릭한 것처럼 동작하도록 
        if (kakaoRef.current) {
            console.log(kakaoRef.current);
        //   (kakaoRef.current as any).click(); // KakaoLogin 컴포넌트를 클릭한 것처럼 동작
        }
    };
    

    const kakaoOnSuccess = async (data : any)=> {
        try {
            console.log(data);
            const accessToken = data.response.access_token; // 엑세스 토큰 백엔드로 전달
            const idUser = data.profile.id; // 엑세스 토큰 백엔드로 전달
            const nickname = data.profile.properties.nickname; //kakao 유저 닉네임
            setUser({nickname, idUser });
            const result = await postData('user',{accessToken, nickname , idUser});
            // console.log(result);
            navigate(ROUTES.CREATE_GROUP);
        } catch (error) {
            console.log(error);
        }
    }

    const kakaoOnFailure = (error :any) => {
        console.log(error);
    };

    return(
        <StyledKakaoDiv>
            <StyledImage src='./images/kakao.png' alt='카카오 이미지'/>
            {!user.nickname ? 
                <StyledKakao
                    ref={kakaoRef}
                    token={kakaoClientId}
                    onSuccess={kakaoOnSuccess}
                    onFail={kakaoOnFailure}
                    // onLogout={responseKaKao}
                />
            :  
                <span>{user.nickname} 님 환영해요~!</span>
            }
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
    cursor: pointer;
`

const StyledKakao = styled(KakaoLogin) `
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
`

export default SocialKakao
