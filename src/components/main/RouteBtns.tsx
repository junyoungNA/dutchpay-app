import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import SocialKakao from '../SocialKakao';
import { StyledButtonWrapper } from '../../aseets/styled/ButtonWrapper';
import styled from 'styled-components';
import { calendar, dutchpay, plan } from '../../aseets';
import Lottie from 'lottie-react';
import {ROUTES} from '../../route/routes'
import { kakaoUser } from '../../state/kakaoUser';
import { useRouter } from '../../hooks/useRouter';

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

const StlyedNavBtn  = styled.button<{background? : string}>`
    border-radius: 15px;
    font-weight:700;
    font-size: 16px;
    height: 50px;
    border: none;
    background-color: ${({background}) => (background ? background : 'gray')};
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
        withAuth : true
    },
    {
        path:ROUTES.CALENDAR,
        lottie:() => <StlyedCalendarLottie animationData={calendar} />,
        color:'#66a4f5',
        text : '캘린더 보러가기',
        withAuth : false,
    },
]


const RouteBtns = () => {
    const {routeTo} = useRouter();
    const {nickname} = useRecoilValue(kakaoUser);

    useEffect(() => {
        console.log('유저 정보', nickname);
    }, [nickname]);
    return (
        <>
            <SocialKakao/>
                {routeBtnData.map((btn : IRouteBtnData ,idx:number) => (
                    btn.withAuth && !nickname  ? null : 
                    <StyledButtonWrapper onClick={() => routeTo(btn.path)} background={btn.color} key={idx}>
                        {btn.lottie()}
                    <StlyedNavBtn background={btn.color}>{btn.text}</StlyedNavBtn>
                </StyledButtonWrapper>
            ))}
        </>
    )
}

export default RouteBtns
