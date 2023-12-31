import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil'
import { expensesState } from '../../atom/expenses'
import { Table } from 'react-bootstrap'
import OverlayWrapper from '../shared/OverlayWrapper'
import styled from 'styled-components'
import { kakaoUser } from '../../atom/kakaoUser'
import { useCallback, useEffect } from 'react'
import { deleteExpense, getExpenses } from '../../util/api/api'
import { groupNameState } from '../../atom/groupName'
import { Button } from 'react-bootstrap' 
import showAlert from '../../util/shoAlert'

const ExpenseTable = () => {
    const {idUser} = useRecoilValue(kakaoUser);
    const groupName =  useRecoilValue(groupNameState);
    const [expense,setExpense] = useRecoilState<any>(expensesState);
    // const resetExpense = useResetRecoilState(expensesState);
    
    const fetchData = useCallback(async (idUser : string, groupName : string) => {
        try {
            console.log(idUser, groupName, '프론트 getExpense');
            const expenses: any = await getExpenses(idUser, groupName);
            console.log(expenses, '클라이언트 받은 데이터');
            if(!expenses)  return showAlert('해당 그룹의 존재하는 더치페이 정보가 없습니다.');
            setExpense(expenses);
        } catch (error) {
            console.error('데이터를 가져오는 중 오류 발생:', error);
        }
    },[setExpense]);

    useEffect(() => {
        fetchData(idUser, groupName);
    }, [idUser, groupName, fetchData]);

    const deleteExpenseHandler = async (groupName : string, expenseName: string) => {
        try {
            if(window.confirm('해당 더치페이 정보를 삭제하시겠습니까?') === false) return;
            const  result: any = await deleteExpense(idUser, groupName, expenseName);
            console.log(result, '클라이언트 삭제 정보');
            alert('해당 더치페이 정보를 삭제하였습니다.');
            if(result.msg === '데이터가 없습니다.') return setExpense([]);
            setExpense(result);
        } catch (error : any) {
            console.log(error,'에러 발생');
        }
    }

    return (
        <OverlayWrapper minheight={'73vh'} padding={'50px'} overflowY={'auto'} maxheight={'73vh'}>
            <StyledTable responsive data-testid='expenseList' borderless hover>
                <StyledThead>
                    <tr>
                        <th>날짜</th>
                        <th>내용</th>
                        <th>결제자</th>
                        <th>금액</th>
                    </tr>
                </StyledThead>
                <StyledTbody>
                    {expense?.map(({date, desc:expenseName, amount, payer, groupName} : any, idx : any) => 
                        <tr key={idx}>
                            <td>{date}</td>
                            <td>{expenseName}</td>
                            <td>{payer} </td>
                            <td>{amount} 원</td>
                            <td colSpan={1}><StyledDeleteBtn onClick={() => deleteExpenseHandler(groupName, expenseName)}>삭제</StyledDeleteBtn></td>
                        </tr>
                    )}
                </StyledTbody>
            </StyledTable>
        </OverlayWrapper>
    )
}

const StyledTable = styled(Table)`
    height: 1px;
    overflow-y:auto ;
`

const StyledThead = styled.thead`
    color: #683DA6 ;
    text-align: center;
    font-weight: 700;
    font-size: 22px;
    line-height: 29px;
    th {
        color: #683DA6 ;
        padding: 10px 8px;
        white-space: nowrap;
    }
`

const StyledTbody = styled.tbody`   
    height: 1px;
    overflow-y:auto ;
    td {
        font-weight: 400;
        font-size: 22px;
        line-height : 59px;
        text-align: center;
        white-space: nowrap;
    }
`

const StyledDeleteBtn = styled(Button)`
    text-align: center;
`

export default ExpenseTable
