import {atom} from 'recoil';
import { recoilPersist } from 'recoil-persist';

// 더치페이를 위한 그룹 멤버들 이름 상태
const { persistAtom: persistExpenses } = recoilPersist({
    key: 'groupMembersPersist', // expensesState를 위한 고유한 키
});

export const groupMemberState = atom({
    key: 'groupMembers', // unique ID (with respect to other atoms/selectors)
    default: [] as string[], // default value (aka initial value)
    effects_UNSTABLE: [persistExpenses], //새로고침되도 더치페이 상세정보 유지!

});