import { useRecoilValue } from 'recoil';
import { kakaoUser } from '../../atom/kakaoUser';
import { StyledBootStrapCol } from '../../aseets/styled/BootStrapCol';
import { StyledBootStrapRow } from '../../aseets/styled/BootStrapRow';
import { StyledBootStrapImage } from '../../aseets/styled/BootStrapImage';
import routeBtnData, { TRouteBtnData } from '../../constants/routeBtnData';
import RouteBtnWrapper from './RouteBtnWrapper';

// Lottie 애니메이션 데이터를 나타내는 타입 정의

const RouteBtnGroups = () => {
    const {nickname} = useRecoilValue(kakaoUser);

    return (
        <>
            {routeBtnData.map(({text, title, color, routePath, lottie, withAuth} : TRouteBtnData ,idx:number) => (
                withAuth && !nickname  ? null : 
                <RouteBtnWrapper routePath={routePath} lottie={lottie} color={color} text={text} title={title}/>
            ))}
        </>
    )
}
export default RouteBtnGroups
