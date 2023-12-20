import { useRecoilValue } from 'recoil';
import { StyledButtonWrapper } from '../../aseets/styled/ButtonWrapper';
import { calendar, dutchpay, plan } from '../../aseets';
import {ROUTES} from '../../route/routes'
import { kakaoUser } from '../../atom/kakaoUser';
import { useRouter } from '../../hooks/useRouter';
import { StyledBootStrapCol } from '../../aseets/styled/BootSrapCol';
import { StyledBootStrapRow } from '../../aseets/styled/BootStrapRow';
import { StyledBootStrapImage } from '../../aseets/styled/BootStrapImage';
import { StlyedCalendarLottie, StlyedDutchpayLottie, StlyedNavBtn, StlyedPlanLottie } from '../../aseets/styled/RouteButtons/RouteBtns';

// Lottie 애니메이션 데이터를 나타내는 타입 정의
interface IRouteBtnData {
    path: string;
    lottie:  () => JSX.Element;
    color: string;
    text: string;
    img : string;
    withAuth : boolean;
}

// 똑같은 스타일의 route 용 버튼들을 
// 반복문을 돌려 버튼들을 보여주기 위해 생성하였다
// 하지만 jsx부분에서 해당 lottie부분의 컴포넌트를 함수형태로 생성하여 
// lottie컴포넌트를 return하는  함수를 실행해서 보여줘야한다는 문제가있다
// 이부분을 컴포넌트를 다시 빼봐서 함성컴포넌트로 작성했을때와 차이점을 한번 알아봐야겠다.
const routeBtnData = [
    {
        path:ROUTES.DUTCHPAY,
        lottie:() => <StlyedDutchpayLottie animationData={dutchpay} />,
        color:'#ae7df9',
        text : '더치페이 하러가기',
        img : '/images/PlanofP1.png',
        withAuth : true
    },
    {
        path:ROUTES.PLAN,
        lottie: () => <StlyedPlanLottie animationData={plan} />,
        color:'#e97522',
        text : '계획 짜러가기',
        img :'/images/PlanofP2.png',
        withAuth : true
    },
    {
        path:ROUTES.CALENDAR,
        lottie:() => <StlyedCalendarLottie animationData={calendar} />,
        color:'#66a4f5',
        text : '캘린더 보러가기',
        img :'/images/PlanofP3.png',
        withAuth : false,
    },
]

const RouteBtnGroups = () => {
    const {routeTo} = useRouter();
    const {nickname} = useRecoilValue(kakaoUser);

    return (
        <>
            {routeBtnData.map((btn : IRouteBtnData ,idx:number) => (
                btn.withAuth && !nickname  ? null : 
                    <StyledButtonWrapper onClick={() => routeTo(btn.path)} background={btn.color} key={idx}> 
                            {btn.lottie()}
                        <StlyedNavBtn background={btn.color}>{btn.text}</StlyedNavBtn>
                    </StyledButtonWrapper>
            ))}
        </>
        // <StyledBootStrapRow>
        //      <StyledBootStrapCol hover={true} md={3} height='300px'>
        //             {/* <StyledBootStrapImage src={btn.img}/> */}
        //     </StyledBootStrapCol>
        // </StyledBootStrapRow>
    )
}
export default RouteBtnGroups
