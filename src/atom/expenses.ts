import {atom} from 'recoil';
import { recoilPersist } from 'recoil-persist';

export interface IExpenseState {
    date : string;
    desc : string;
    amount :  number;
    payer : string,
    idUser : string,
    groupName : string,
}
const { persistAtom: persistExpenses } = recoilPersist({
    key: 'expensesPersist', // expensesState를 위한 고유한 키
});

export const expensesState = atom({
    key: 'expense', // unique ID (with respect to other atoms/selectors)
    default: [] as IExpenseState[], // default value (aka initial value)
    effects_UNSTABLE: [persistExpenses], //새로고침되도 더치페이 상세정보 유지!
});