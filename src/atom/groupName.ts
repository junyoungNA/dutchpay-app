import {atom} from 'recoil';
import { recoilPersist } from 'recoil-persist';

// 더치페이를 위한 그룹이름
const { persistAtom: persistGroupName } = recoilPersist({
    key: 'persistGroupName', // kakaoUser를 위한 고유한 키
});

export const groupNameState = atom({
    key: 'groupName', 
    default: '', 
    effects_UNSTABLE:[persistGroupName],
});