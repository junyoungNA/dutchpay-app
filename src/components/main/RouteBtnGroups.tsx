import { useRecoilValue } from 'recoil';
import { kakaoUser } from '../../atom/kakaoUser';
import routeBtnData, { TRouteBtnData } from '../../constants/routeBtnData';
import RouteBtnMinWrapper from './RouteBtnMinWrapper';

// Lottie 애니메이션 데이터를 나타내는 타입 정의

const RouteBtnGroups = () => {
    const {nickname} = useRecoilValue(kakaoUser);

    return (
        <>
            {routeBtnData.map(({text, title, color, routePath, lottie, withAuth} : TRouteBtnData ,idx:number) => (
                withAuth && !nickname  ? null : 
                <RouteBtnMinWrapper routePath={routePath} lottie={lottie} color={color} text={text} title={title}/>
            ))}
        </>
    )
}
export default RouteBtnGroups
