import Lottie from 'lottie-react';
import { calendar, dutchpayButton, loginSide_animation } from '../aseets';
import React,{useEffect, useState} from 'react';
import { Col, Row } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import styled from 'styled-components';
import SocialKakao from './SocialKakao';
import ServiceLogo from './shared/ServiceLogo';
import ExsitingGroups from './ExsitingGroups';
import  {getGroupMembers} from '../util/api/api'
import { useRecoilValue } from 'recoil';
import { kakaoUser } from '../state/kakaoUser';
import { useNavigate } from 'react-router-dom';
import {ROUTES} from '../route/routes'
import { StyledButtonWrapper } from '../aseets/styled/ButtonWrapper';

const Login:React.FC = () => {
    const navigate = useNavigate();
    const {idUser,nickname} = useRecoilValue(kakaoUser);
    const [userGroups, setUserGroups] = useState([]);

    const getGroupMemberFetch = async(idUser : string) => {
        const resultGroups = await getGroupMembers(idUser);
        console.log(resultGroups,'유저의 그룹들');
        setUserGroups(resultGroups);
    }

    useEffect(() => {
        if(idUser) {
            getGroupMemberFetch(idUser);
        }
    }, [idUser]);


    return (
        <StyledContainer style={{gap:'2'}}>
            <StyledRow >
                <Col lg={8} md={7} >
                    <Lottie animationData ={loginSide_animation} />
                </Col>
                <StyledLoginCol lg={4} md={5} >
                    <ServiceLogo/>
                    <StyledGreetings>안녕하세요~ 플랜 B를 통해 <br/>언제든 계획을 수립하고 기록해보세요</StyledGreetings>
                    <SocialKakao/>
                    <StyledButtonWrapper onClick={() => navigate(ROUTES.CREATE_GROUP)} background='#ae7df9'>
                        <StlyedDutchpayLottie animationData={dutchpayButton}></StlyedDutchpayLottie>
                        <StlyedNavBtn background='#ae7df9'>더치페이 하러가기</StlyedNavBtn>
                    </StyledButtonWrapper>
                    <StyledButtonWrapper onClick={() => navigate(ROUTES.CALENDAR)} background='#66a4f5'>
                        <StlyedCalendarLottie animationData={calendar}></StlyedCalendarLottie>
                        <StlyedNavBtn background='#66a4f5'>캘린더 보러가기</StlyedNavBtn>
                    </StyledButtonWrapper>
                </StyledLoginCol>
                {nickname && userGroups && <ExsitingGroups userGroups={userGroups} nickname={nickname}/>}
            </StyledRow>
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
const StyledGreetings = styled.div`
    font-weight:500;
    font-size: 16px;
    text-align: center;
    line-height: 30px;
    white-space: pre;
`

const StyledLoginCol = styled(Col)`
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 0;
    gap: 15px;
`
const StlyedNavBtn  = styled.button<{background? : string}>`
    border-radius: 15px;
    font-weight:700;
    font-size: 16px;
    height: 50px;
    border: none;
    background-color: ${({background}) => (background ? background : 'gray')};
`
const StlyedDutchpayLottie = styled(Lottie)`
    width: 40px;
    height: 40px;
    object-fit: fill;
    border-radius: 100%;
    position: absolute;
    left: 10px;
`

const StlyedCalendarLottie = styled(Lottie)`
    width: 125px;
    height: 125px;
    border-radius: 100%;
    position: absolute;
    left: -35px;
    pointer-events: none;
`

export default Login
