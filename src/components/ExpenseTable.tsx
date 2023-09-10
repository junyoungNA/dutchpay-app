import { useRecoilValue } from 'recoil'
import { expensesState } from '../state/expenses'
import { Table } from 'react-bootstrap'
import OverlayWrapper from './shared/OverlayWrapper'
import styled from 'styled-components'

const ExpenseTable = () => {
    const expense = useRecoilValue(expensesState);
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
}
`

export default ExpenseTable
