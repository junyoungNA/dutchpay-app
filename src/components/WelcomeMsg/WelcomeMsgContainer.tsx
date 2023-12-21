import { useRecoilValue } from 'recoil';
import { kakaoUser } from '../../atom/kakaoUser';
import WelcomeMsg from './WelcomeMsg';

const WelcomeMsgContainer = () => {
    const {nickname} = useRecoilValue(kakaoUser);
    return <WelcomeMsg nickname={nickname} />;
};

export default WelcomeMsgContainer;
