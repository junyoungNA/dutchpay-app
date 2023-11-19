import {atom} from 'recoil';

export const memberIdState = atom({
    key: 'memberId', // unique ID (with respect to other atoms/selectors)
    default: '', // default value (aka initial value)
});