import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil'
import { expensesState } from '../state/expenses'
import { Table } from 'react-bootstrap'
import OverlayWrapper from './shared/OverlayWrapper'
import styled from 'styled-components'
import { kakaoUser } from '../state/kakaoUser'
import { useEffect } from 'react'
import { getExpenses } from '../util/api/api'
import { groupNameState } from '../state/groupName'

const ExpenseTable = () => {
    const {idUser} = useRecoilValue(kakaoUser);
    const groupName =  useRecoilValue(groupNameState);
    const [expense,setExpense] = useRecoilState(expensesState);
    const resetExpense = useResetRecoilState(expensesState);

    const fetchData = async (idUser : string, groupName : string) => {
        try {
            const expenses: any = await getExpenses(idUser, groupName);
            // console.log(expenses, '클라이언트 받은 데이터');
            if(!expenses) return;
            setExpense(expenses);
        } catch (error) {
            console.error('데이터를 가져오는 중 오류 발생:', error);
        }
    };

    useEffect(() => {
        resetExpense();       
        fetchData(idUser, groupName);
    }, [groupName]);

    return (
        <OverlayWrapper minheight={'73vh'} padding='100px'>
            <Table data-testid='expenseList' borderless hover responsive>
                <StyledThead>
                    <tr>
                        <th>날짜</th>
                        <th>내용</th>
                        <th>결제자</th>
                        <th>금액</th>
                    </tr>
                </StyledThead>
                <StyledTbody>
                    {expense?.map(({date, desc, amount, payer}, idx) => 
                        <tr key={idx}>
                            <td>{date}</td>
                            <td>{desc}</td>
                            <td>{payer} </td>
                            <td>{amount} 원</td>
                        </tr>
                    )}
                </StyledTbody>
            </Table>
        </OverlayWrapper>
    )
}

const StyledThead = styled.thead`
    color: #683DA6 ;
    text-align: center;
    font-weight: 700;
    font-size: 22px;
    line-height: 29px;
    white-space: nowrap;
    th {
        color: #683DA6 ;
        padding: 10px 8px;
    }
`

const StyledTbody = styled.tbody`
    td {
        font-weight: 400;
        font-size: 22px;
        line-height : 59px;
        text-align: center;
}
`

export default ExpenseTable
