import {atom} from 'recoil';

export const groupNameState = atom({
    key: 'groupName', // unique ID (with respect to other atoms/selectors)
    default: '', // default value (aka initial value)
});