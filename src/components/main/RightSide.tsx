import ServiceLogo from '../ServiceLogo';
import { StyledBootStrapCol } from '../../aseets/styled/BootStrapCol';
import SocialKakao from '../SocialKakao';
import ServiceWelecomeMsg from '../WelcomeMsg/ServiceWelecomeMsg';
import RouteBtnGroups from './RouteBtnGroups';
import useWindowSize from '../../hooks/useWindowSize';

const RightSide = () => {
    const { width: windowWidth } = useWindowSize();
    const isRenderRouteBtnGroups = windowWidth < 1100;

    return (
        <StyledBootStrapCol md={7} gap={'20px'} width='400px' height={'450px'} margin='15px 0 0 0'>
            <ServiceLogo/>
            <ServiceWelecomeMsg/>
            <SocialKakao/>
            {isRenderRouteBtnGroups && <RouteBtnGroups />}
        </StyledBootStrapCol>
    )
}

export default RightSide
