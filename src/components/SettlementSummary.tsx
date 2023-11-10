import { useRecoilValue } from 'recoil';
import { expensesState } from '../state/expenses';
import { groupMemberState } from '../state/groupMembers';
import { calculatteMinimumTransaction } from '../util/calculatMinimumTransaction'; 
import styled from 'styled-components';
import { StyledTitle } from './AddExpenseForm';

const SettlementSummary = () => {
    const expense = useRecoilValue(expensesState);
    const members = useRecoilValue(groupMemberState);
    const totalExpenseAmount = expense.reduce((prevAmount, curExpense) => prevAmount +(Number(curExpense.amount)), 0);
    const groupMemberCount = members.length;
    const splitAmount = Math.floor(totalExpenseAmount / groupMemberCount);

    const minimumTransaction = calculatteMinimumTransaction(expense, members, splitAmount);
    return (
        <StyledWrapper>
            <StyledTitle>2.정산은 이렇게!</StyledTitle>
            {totalExpenseAmount > 0 && groupMemberCount > 0 && 
            <>
                <StyledSummary  data-testid="expenseResult">
                    <span>{groupMemberCount}명 - 총 {totalExpenseAmount} 원 지출</span>
                    <br/>
                    <span>한사람 당 {splitAmount} 원</span>
                </StyledSummary>
                <StyledUl>
                    {minimumTransaction.map(({sender, receiver, amount}, idx) => {
                        if(sender === receiver) return null;
                        return (
                            <li key={idx}>
                                <span>{sender}가 {receiver} 에게 {amount} 원 보내기</span>
                            </li>
                        )}
                    )}
                </StyledUl>
            </>
            }
        </StyledWrapper>
    ) 
}

const StyledWrapper = styled.div`
    padding : 30px;
    background-color: #6838A1;
    color: #FFFBFB;
    box-shadow: 3px 0px 4px rgba(0, 0, 0, 0.25);
    border-radius: 15px;
    text-align: center;
    font-size: 22px;
`

const StyledSummary = styled.div`
    margin-top: 31px;
`

const StyledUl = styled.ul`
    margin-top : 31px;
    font-weight: 600;
    font-size: 18px;
    line-height: 200%;

    list-style-type: disclosure-closed;
    li::marker {
        animation : blinker 3s infinite;
    }

    @keyframes blinker {
        50% {
            opacity: 0;
        }
    }
`

export default SettlementSummary
