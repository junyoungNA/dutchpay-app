import { FormEvent, useState, useEffect, useCallback } from 'react'
import { Col, Form, Row } from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { groupMemberState } from '../../atom/groupMembers'
import getCalenderDate from '../../util/getCurrentDate'
import {  IExpenseState, expensesState } from '../../atom/expenses'
import styled from 'styled-components'
import { postData } from '../../util/api/apiInstance'
import { groupNameState } from '../../atom/groupName'
import {getExpenses} from '../../util/api/api'
import { TKakaoUser, kakaoUser } from '../../atom/kakaoUser'

const AddExpenseForm = () => {
    const groupMembers:string[] = useRecoilValue(groupMemberState);
    const {idUser} = useRecoilValue<TKakaoUser>(kakaoUser);
    const groupName = useRecoilValue(groupNameState);
    const setExpense = useSetRecoilState(expensesState);

    const today = getCalenderDate(); //오늘 날짜 가져오기
    const [date, setDate] = useState(today) ;
    const [desc, setDesc] = useState('');
    const [amount, setAmount] = useState(0);
    const [payer, setPayer] = useState('');
    const [validated, setValidated] = useState(false); 

    const [isDescValid, setDescValid] = useState(false);
    const [isAmountValid, setAmountValid] = useState(false);
    const [isPayerValid, setPayerValid] = useState(false);

    useEffect(() => {
        //useEffect내에서 바로 async 호출 불가능!
        //fetchData감싸주어 호출
        fetchData(idUser, groupName);
    }, [idUser, groupName]);

    const fetchData = async (idUser : string, groupName : string) => {
        try {
            const expenses: any = await getExpenses(idUser, groupName);
            // console.log(expenses, '클라이언트 받은 데이터');
            if(!expenses) return;
            setExpense(expenses);
        } catch (error) {
            console.error('데이터를 가져오는 중 오류 발생:', error);
        }
    }

    const checkFormValidated = () => {
        const desceValid = desc.length > 0;
        const payerValid = payer !== (null || '');
        const amountValid = amount > 0 && amount < 1000000;
        setDescValid(desceValid);
        setPayerValid(payerValid);
        setAmountValid(amountValid);

        return desceValid && payerValid && amountValid
    }
    
    const handleSubmit = async(event:FormEvent<HTMLFormElement>) => {
        try {
            event.preventDefault();
            if(checkFormValidated()) {
                const newExpense = {
                    date,
                    desc,
                    amount,
                    payer,
                    idUser,
                    groupName,
                }
                const result = await postData('expense', newExpense);
                // console.log(result, '클라이언트 reuslt');
                setExpense((prevExpenses : IExpenseState[] ) =>[
                    ...prevExpenses,
                    newExpense
                ])
            }
            setValidated(true);
        } catch(error) {
            console.log('더치페이 추가 에러', error);
        }
    }

    return (
        <StyledWrapper>
            <Form  noValidate onSubmit={handleSubmit}>
                <StyledTitle>비용 추가하기</StyledTitle>
                <StyledFormGroup>
                    <Row>
                        <Col xs={12}>
                            <Form.Label>날짜</Form.Label>
                                {/* 날짜 선택 Form */}
                            <Form.Control
                                type='date'
                                placeholder='결제한 날짜를 선택해 주세요.'
                                onChange={(e) => setDate(e.target.value)}
                                value={date}
                                />
                        </Col>
                    </Row>
                </StyledFormGroup>
                {/* 비용 설명 입력 Form */}
                <StyledFormGroup controlId=''>
                    <Row>
                        <Col xs={12}>
                            <Form.Label>비용 설명</Form.Label>
                            <Form.Control
                                required
                                type='text'
                                placeholder='비용에 대한 설명을 해주세요.'
                                isValid= {isDescValid}
                                isInvalid = {!isDescValid && validated}
                                value={desc}
                                onChange={({target}) => setDesc(target.value)}/>
                            <StyledFormControlFeedback type='invalid' data-valid={isDescValid}> 비용 내용을 입력해 주셔야 합니다.</StyledFormControlFeedback>
                        </Col>
                    </Row>
                </StyledFormGroup>
                {/* 비용  입력 Form */}
                <Row>
                    <Col xs={12} lg={6}>
                        <StyledFormGroup>    
                            <Form.Label>금액</Form.Label>
                            <Form.Control
                                required
                                type='number'
                                value={amount}
                                isValid= {isAmountValid}
                                isInvalid = {!isAmountValid && validated}
                                onChange={({target}) => setAmount(Number(target.value))}
                                placeholder='비용은 얼마였나요?.'/>
                            <StyledFormControlFeedback type='invalid' data-valid={isAmountValid} styled={{fontSize:'14px'}}>금액은 1원 이상 <br /> 1000000원 이하로 입력해주세요.</StyledFormControlFeedback>
                        </StyledFormGroup>
                    </Col>
                    <Col xs={12} lg={6}>
                        <StyledFormGroup>
                                <Form.Label>멤버 정하기</Form.Label>
                                    <Form.Select
                                        required
                                        defaultValue=""
                                        isValid={isPayerValid}
                                        isInvalid = {!isPayerValid && validated}
                                        onChange={({target}) => setPayer(target.value)}
                                        style={{padding: '0 12px'}}
                                        // className='form-control'
                                    >
                                        <option value="" defaultValue='' disabled style={{display:'none'}}>누가 결제 했나요?</option>
                                        {groupMembers.map((member : string) => 
                                            <option value={member} key={member}>{member}</option>
                                        )}
                                    </Form.Select>
                                <StyledFormControlFeedback type='invalid' data-valid={isPayerValid}> 결제자를 선택해 주셔야 합니다.</StyledFormControlFeedback>
                        </StyledFormGroup>
                    </Col>
                </Row>
                <Col xs={12} className='d-grid gap-2'> 
                {/* className으로 button 박스 width, gap 조정 */}
                    <StyledSubmitButton  type='submit'>추가하기</StyledSubmitButton>
                </Col>
            </Form>
        </StyledWrapper>
    )
}

const StyledFormControlFeedback = styled(Form.Control.Feedback) `
    margin-left : 10px;
`

const StyledFormGroup = styled(Form.Group)`
    margin-bottom: 15px;
    input, select {
        background: #59359A;
        box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25);
        border-radius: 15px;
        border:0;
        color: #F8F9FA;
        /* margin-left: 18px; */
        height: 45px;

        &:focus {
            color: #F8F9FA;
            background: #59359A;
            /* filter: rgba(0, 0,  0, 0.0); */
            filter: brightness(80%);
        }
        ::placeholder {
            color: #F8F9FA;
        }
    }
    
`

export const StyledTitle = styled.h3`
    color: #FFFBFB;
    text-align : center;
    font-weight: 700;
    font-size: 35px;
    line-height: 40px;
    letter-spacing: 0.25;
    margin-bottom:15px;
`
const StyledSubmitButton = styled(Button).attrs({
        type :'submit'
    })`
        padding : 16px 32px;
        height:60px;
        border: 0px;
        border-radius: 10px; 
        background-color: #E2D9F3;
        color: #59359a;
        margin-top: 18px;
        gap : 8px;
        & :hover { 
            background-color: #6610F2;
            opacity: 0.8;
    }
`
const StyledWrapper = styled.div`
    padding: 50px;
    background-color: #683BA1;
    border-radius: 15px;
    box-shadow: 3px 0px 4px rgba(0, 0, 0, 0.25);
`


export default AddExpenseForm
