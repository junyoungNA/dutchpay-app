import {atom} from 'recoil';

// type TypeGroupMember = {
//     memberId : String,
//     members : string[] ;
// }

export const groupMemberState = atom({
    key: 'groupMembers', // unique ID (with respect to other atoms/selectors)
    default: [] as string[], // default value (aka initial value)
});