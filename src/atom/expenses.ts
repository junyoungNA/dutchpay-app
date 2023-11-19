import {atom} from 'recoil';

export interface IExpenseState {
    date : string;
    desc : string;
    amount :  number;
    payer : string,
    idUser : string,
    groupName : string,
}
export const expensesState = atom({
    key: 'expense', // unique ID (with respect to other atoms/selectors)
    default: [] as IExpenseState[], // default value (aka initial value)
});