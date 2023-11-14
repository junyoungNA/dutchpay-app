import React from 'react';
import { Row } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import styled from 'styled-components';
import RightSide from './main/RightSide';
import LeftSide from './main/LeftSide';
import {Button} from 'react-bootstrap';
import { getData } from '../util/api/apiInstance';
import Cookies from 'universal-cookie';
import { AxiosRequestConfig } from 'axios';

const Login:React.FC = () => {

    const getKakaoUserInfo = async () => {
        const cookies = new Cookies();
        const accessToken = cookies.get('kakaoAccess');
        
        // 만약 accessToken이 존재하지 않으면 에러 처리
        if (!accessToken) {
            throw new Error('Kakao access token not found');
        }
    
        const headers = {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json', // 필요에 따라 다른 헤더도 추가할 수 있습니다.
        };
    
        const config: AxiosRequestConfig = {
            headers: headers,
        };

        try {
            const result: any = await getData(`https://kapi.kakao.com/v2/user/me`, config);
            console.log(result,'결과');
        }catch (error) {
            console.error('Error fetching Kakao user info:', error);
        }
    }
    return (
        <StyledContainer style={{gap:'2'}}>
            <StyledRow >
                {/* 왼쪽 사이드 */}
                <LeftSide/>
                {/* 오른쪽 사이드 */}
                <RightSide/>
            </StyledRow>
            <Button onClick={() => getKakaoUserInfo()}>카카오 정보</Button>
        </StyledContainer>
    )
}

const StyledRow = styled(Row)`
    display:'flex';
    justify-content: center;
    align-items: center;
    margin: auto;
    min-height: 500px;
`

const StyledContainer = styled(Container)`
    display: flex;
    height: 100vh;
`

export default Login
