import { ROUTES } from '../route/routes'; 
import { StlyedCalendarLottie, StlyedDutchpayLottie, StlyedPlanLottie } from '../aseets/styled/RouteButtons/RouteBtns';
import { calendar, dutchpay, plan } from '../aseets';

// 해당파일은 데이터 파일로 button들에 데이터를 담고있는데
// lottie 속성은 lottie 컴포넌트를 함수로 만들어 return 해주는 속성이다
//해당부분으로 인해 tsx파일로 작성하였는데 
// 맞는 방법일까?

// 똑같은 스타일의 route 용 버튼들을 
// 반복문을 돌려 버튼들을 보여주기 위해 생성하였다
// 하지만 jsx부분에서 해당 lottie부분의 컴포넌트를 함수형태로 생성하여 
// lottie컴포넌트를 return하는  함수를 실행해서 보여줘야한다는 문제가있다
// 이부분을 컴포넌트를 다시 빼봐서 함성컴포넌트로 작성했을때와 차이점을 한번 알아봐야겠다.
export type TRouteBtnData = {
    routePath: string;
    lottie:  () => JSX.Element;
    color: string;
    text: string;
    img : string;
    withAuth : boolean;
}

const routeBtnData :TRouteBtnData[] = [
    {
        routePath:ROUTES.DUTCHPAY,
        lottie: () => <StlyedDutchpayLottie animationData={dutchpay} />,
        color:'#ae7df9',
        text : '더치페이 하러가기',
        img : '/images/PlanofP1.png',
        withAuth : true
    },
    {
        routePath:ROUTES.PLAN,
        lottie: () => <StlyedPlanLottie animationData={plan} />,
        color:'#e97522',
        text : '계획 짜러가기',
        img :'/images/PlanofP2.png',
        withAuth : true
    },
    {
        routePath:ROUTES.CALENDAR,
        lottie:() => <StlyedCalendarLottie animationData={calendar} />,
        color:'#66a4f5',
        text : '캘린더 보러가기',
        img :'/images/PlanofP3.png',
        withAuth : false,
    },
]

export default routeBtnData;