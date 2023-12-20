import ServiceLogo from '../shared/ServiceLogo';
import { StyledBootStrapCol } from '../../aseets/styled/BootStrapCol';
import SocialKakao from '../SocialKakao';
import RouteBtnGroups from './RouteBtnGroups';

interface IRightSideProps {
    nickname : string | undefined,
}

const RightSide = ({nickname} : IRightSideProps) => {
    return (
        <StyledBootStrapCol md={7} gap={'20px'} width='400px' height={'300px'} margin='15px 0 0 0'>
            <ServiceLogo nickname={nickname}/>
            <SocialKakao/>
            {/* <RouteBtnGroups/> */}
        </StyledBootStrapCol>
    )
}

export default RightSide
