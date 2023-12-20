import { useRecoilValue } from 'recoil';
import { kakaoUser } from '../../atom/kakaoUser';
import { StyledBootStrapCol } from '../../aseets/styled/BootSrapCol';
import { StyledBootStrapRow } from '../../aseets/styled/BootStrapRow';
import { StyledBootStrapImage } from '../../aseets/styled/BootStrapImage';
import { StlyedCalendarLottie, StlyedDutchpayLottie, StlyedNavBtn, StlyedPlanLottie } from '../../aseets/styled/RouteButtons/RouteBtns';
import routeBtnData, { TRouteBtnData } from '../../constants/routeBtnData';
import RouteBtnWrapper from './RouteBtnWrapper';

// Lottie 애니메이션 데이터를 나타내는 타입 정의

const RouteBtnGroups = () => {
    const {nickname} = useRecoilValue(kakaoUser);

    return (
        <>
            {routeBtnData.map(({text, color, routePath, lottie, withAuth} : TRouteBtnData ,idx:number) => (
                withAuth && !nickname  ? null : 
                <RouteBtnWrapper routePath={routePath} lottie={lottie} color={color} text={text} />
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
