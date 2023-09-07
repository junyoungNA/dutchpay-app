import Lottie from 'lottie-react';
import { loginSide_animation } from '../aseets';
import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import styled from 'styled-components';
import SocialKakao from './SocialKakao';
import ServiceLogo from './shared/ServiceLogo';
const Login:React.FC = () => {
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



export default Login
