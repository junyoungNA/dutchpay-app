import {atom} from 'recoil';

// 더치페이를 위한 그룹이름
export const groupNameState = atom({
    key: 'groupName', 
    default: '', 
});