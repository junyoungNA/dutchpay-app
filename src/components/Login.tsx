import Lottie from 'lottie-react';
import { calendar, dutchpay, loginSide_animation,plan } from '../aseets';
import React, { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import styled from 'styled-components';
import SocialKakao from './SocialKakao';
import ServiceLogo from './shared/ServiceLogo';
import { useNavigate } from 'react-router-dom';
import {ROUTES} from '../route/routes'
import { StyledButtonWrapper } from '../aseets/styled/ButtonWrapper';
import { kakaoUser } from '../state/kakaoUser';
import { useRecoilValue } from 'recoil';

// Lottie 애니메이션 데이터를 나타내는 타입 정의
    
interface IRouteBtnData {
    path: string;
    lottie:  () => JSX.Element;
    color: string;
    text: string;
    withAuth : boolean;
}

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

const StlyedPlanLottie = styled(Lottie)`
    width: 55px;
    height: 40px;
    position: absolute;
    pointer-events: none;
    left: 5px;
`

const routeBtnData = [
    {
        path:ROUTES.PLAN,
        lottie: () => <StlyedPlanLottie animationData={plan} />,
        color:'#e97522',
        text : '계획 짜러가기',
        withAuth : true

    },
    {
        path:ROUTES.CREATE_GROUP,
        lottie:() => <StlyedDutchpayLottie animationData={dutchpay} />,
        color:'#ae7df9',
        text : '더치페이 하러가기',
        withAuth : false
    },
    {
        path:ROUTES.CALENDAR,
        lottie:() => <StlyedCalendarLottie animationData={calendar} />,
        color:'#66a4f5',
        text : '캘린더 보러가기',
        withAuth : false,
    },

]

const Login:React.FC = () => {
    const navigate = useNavigate();
    const {nickname} = useRecoilValue(kakaoUser);

    useEffect(() => {
        console.log('유저 정보', nickname);
    }, [nickname])
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
                    {routeBtnData.map((btn : IRouteBtnData ,idx:number) => (
                        btn.withAuth && !nickname  ? null : 
                        <StyledButtonWrapper onClick={() => navigate(btn.path)} background={btn.color} key={idx}>
                            {btn.lottie()}
                        <StlyedNavBtn background={btn.color}>{btn.text}</StlyedNavBtn>
                    </StyledButtonWrapper>
                    ))}
                </StyledLoginCol>
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

export default Login
