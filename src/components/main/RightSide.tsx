import ServiceLogo from '../shared/ServiceLogo';
import { StyledBootStrapCol } from '../../aseets/styled/BootStrapCol';
import SocialKakao from '../SocialKakao';
import RouteBtnGroups from './RouteBtnGroups';

interface IRightSideProps {
    nickname : string | undefined,
}

const RightSide = ({nickname} : IRightSideProps) => {
    return (
        <StyledBootStrapCol md={6} gap={'20px'} width='330px' height={'300px'} >
            <ServiceLogo nickname={nickname}/>
            <SocialKakao/>
            {/* <RouteBtnGroups/> */}
        </StyledBootStrapCol>
    )
}

export default RightSide
