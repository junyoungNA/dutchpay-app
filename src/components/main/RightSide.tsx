import ServiceLogo from '../ServiceLogo';
import { StyledBootStrapCol } from '../../aseets/styled/BootStrapCol';
import SocialKakao from '../SocialKakao';
import ServiceWelecomeMsg from '../WelcomeMsg/ServiceWelecomeMsg';

const RightSide = () => {
    return (
        <StyledBootStrapCol md={7} gap={'20px'} width='400px' height={'300px'} margin='15px 0 0 0'>
            <ServiceLogo/>
            <ServiceWelecomeMsg/>
            <SocialKakao/>
            {/* <RouteBtnGroups/> */}
        </StyledBootStrapCol>
    )
}

export default RightSide
