import Lottie from 'lottie-react';
import { dutchpayButton, loginSide_animation } from '../aseets';
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

const Login:React.FC = () => {
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
                    <StyledVButtonWrapper>
                        <StlyedDutchpayLottie animationData={dutchpayButton}></StlyedDutchpayLottie>
                        <StlyedCreateGroupBtn>더치페이 하러가기</StlyedCreateGroupBtn>
                    </StyledVButtonWrapper>
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

export const StyledVButtonWrapper = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 15px;
    height: 50px;
    margin-left: 20px;
    width: 300px;
    padding-left: 10px;
    background: #ae7df9;
    cursor: pointer;
`

const StlyedCreateGroupBtn  = styled.button`
    border-radius: 15px;
    font-weight:700;
    font-size: 16px;
    height: 50px;
    border: none;
    margin-left: 20px;
    background: #ae7df9;
`
const StlyedDutchpayLottie = styled(Lottie)`
    width: 40px;
    height: 40px;
    object-fit: fill;
    border-radius: 100%;
    position: absolute;
    left: 10px;
`

export default Login
