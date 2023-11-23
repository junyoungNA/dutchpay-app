import { useRecoilValue } from "recoil";
import { IExpenseState, expensesState } from "../atom/expenses";
import { IMinTransaction, calculatteMinimumTransaction } from "../util/calculatMinimumTransaction";
import { groupMemberState } from "../atom/groupMembers";

// interface IuseSettlemnetSummaryProps {
//     expense : IExpenseState[];
//     members : string[];
// }

export interface ISettlementSummary {
    totalExpenseAmount: number;
    groupMemberCount: number;
    splitAmount: number;
    minimumTransaction: IMinTransaction[];
}

export const useSettlemnetSummary = () :  ISettlementSummary => {
    const expense:IExpenseState[]= useRecoilValue(expensesState);
    const members:string[] = useRecoilValue(groupMemberState);
    const totalExpenseAmount:number = expense.reduce((prevAmount: any, curExpense : any) => prevAmount +(Number(curExpense.amount)), 0);
    const groupMemberCount = members.length;
    const splitAmount = Math.floor(totalExpenseAmount / groupMemberCount);
    const minimumTransaction = calculatteMinimumTransaction(expense, members, splitAmount);

    return {totalExpenseAmount, groupMemberCount, splitAmount, minimumTransaction}
}
