import ServiceLogo from '../shared/ServiceLogo';
import { StyledBootStrapCol } from '../../aseets/styled/BootSrapCol';
import SocialKakao from '../SocialKakao';

const RightSide = () => {
    return (
        <StyledBootStrapCol md={6} gap={'30px'} width='330px' >
            <ServiceLogo/>
            {/* <RouteBtnsGroups/> */}
            <SocialKakao/>
        </StyledBootStrapCol>
    )
}

export default RightSide
