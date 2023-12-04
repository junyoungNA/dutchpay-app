import {atom} from 'recoil';

// 이거 사용하는 곳이 없는 것 같다?
export const memberIdState = atom({
    key: 'memberId', 
    default: '',
});