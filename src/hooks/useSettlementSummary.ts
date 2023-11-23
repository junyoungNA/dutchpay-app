import { IExpenseState } from "../atom/expenses";
import { IMinTransaction, calculatteMinimumTransaction } from "../util/calculatMinimumTransaction";

interface IuseSettlemnetSummaryProps {
    expense : IExpenseState[];
    members : string[];
}

export interface ISettlementSummary {
    totalExpenseAmount: number;
    groupMemberCount: number;
    splitAmount: number;
    minimumTransaction: IMinTransaction[];
}

export const useSettlemnetSummary = ({expense, members} : IuseSettlemnetSummaryProps) :  ISettlementSummary => {
    const totalExpenseAmount:number = expense.reduce((prevAmount: any, curExpense : any) => prevAmount +(Number(curExpense.amount)), 0);
    console.log('totalExpenseAmount', totalExpenseAmount);
    const groupMemberCount = members.length;
    const splitAmount = Math.floor(totalExpenseAmount / groupMemberCount);
    const minimumTransaction = calculatteMinimumTransaction(expense, members, splitAmount);

    return {totalExpenseAmount, groupMemberCount, splitAmount, minimumTransaction}
}
