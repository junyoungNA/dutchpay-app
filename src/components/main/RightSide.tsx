import ServiceLogo from '../shared/ServiceLogo';
import { StyledBootStrapCol } from '../../aseets/styled/BootSrapCol';
import SocialKakao from '../SocialKakao';
import RouteBtnGroups from './RouteBtnGroups';

const RightSide = () => {
    return (
        <StyledBootStrapCol md={6} gap={'20px'} width='330px' height={'500px'} >
            <ServiceLogo/>
            <SocialKakao/>
            <RouteBtnGroups/>
        </StyledBootStrapCol>
    )
}

export default RightSide
