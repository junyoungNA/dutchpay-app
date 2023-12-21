import ServiceLogo from '../shared/ServiceLogo';
import { StyledBootStrapCol } from '../../aseets/styled/BootStrapCol';
import SocialKakao from '../SocialKakao';
import RouteBtnGroups from './RouteBtnGroups';
import NicknameProvider from '../common/NicknameProvider';

interface IRightSideProps {
    nickname : string | undefined,
}

const RightSide = () => {
    return (
        <StyledBootStrapCol md={7} gap={'20px'} width='400px' height={'300px'} margin='15px 0 0 0'>
            <NicknameProvider>
                <ServiceLogo/>
            </NicknameProvider>
            <SocialKakao/>
            {/* <RouteBtnGroups/> */}
        </StyledBootStrapCol>
    )
}

export default RightSide
