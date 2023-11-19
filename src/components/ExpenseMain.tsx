import React from 'react'
import AddExpenseForm from './AddExpenseForm'
import ExpenseTable from './ExpenseTable'
import { Col, Container, Row, Stack } from 'react-bootstrap'
import styled from 'styled-components'
import { useRecoilValue } from 'recoil'
import { groupNameState } from '../atom/groupName'
import SettlementSummary from './SettlementSummary'
//비용 정산하는 페이지
const Expense = () => {
    return (
        // fluid 페이지의 가로 너비에 맞추어 그리드 컨텐츠를 채우려고 시도
        <Container fluid>
            <Row>
                <Col xs={12} sm={5}>
                    {/* 비용추가 폼 */}
                    <LeftPane/> 
                </Col>
                <Col >
                    <RightPane/>
                    {/* TODO: 비용 리스트 컴포넌트 렌더링 */}
                </Col>
            </Row>
        </Container>
    )
}

const LeftPane: React.FC<{}> = () => {
    return (
        <StyledContainer >
        {/* 정산 결과 컴포넌트 렌더링 */}
            <Stack gap={5}> 
                {/* <ServiceLogo/> */}
                <AddExpenseForm/>
                <SettlementSummary/>
            </Stack>
        </StyledContainer>
    )
}
    
const RightPane: React.FC<{}> = () =>{
    const groupName = useRecoilValue(groupNameState);
    return (
        <StyledContainer>
            <Row>
                <StyledGroupName>{groupName || '그룹 이름'} </StyledGroupName>
                 {/* TODO: 그룹명 헤더 렌더링 */}
            </Row>
            <Row>
                <ExpenseTable/>
            </Row>
        </StyledContainer>
    )
}

const StyledContainer = styled(Container)`
    padding: 80px 31px;
`

const StyledGroupName = styled.h2`
    margin-bottom: 15px;
    text-align: center;
    font-weight: 700;
    font-size: 40px;
    line-height: 40px;
    letter-spacing: 2px;
`

export default Expense
