import { useRecoilState, useResetRecoilState } from 'recoil';
import { StyledCalendarCol, StyledCalendarProps, StyledCalendarRow } from './Calendar'
import { ArrowRight, ArrowLeft } from 'react-bootstrap-icons';
import { calendarDateState } from '../../atom/calendarDate';
import { Button } from 'react-bootstrap';
import styled from 'styled-components';

const CalendarControls  = () => {
    const [{year, month}, setCalendar] = useRecoilState(calendarDateState);

    // useResetRecoilState로 초기화 함수 가져오기
    const resetCalendarState = useResetRecoilState(calendarDateState);

    const onClickArrowSetCalendar = (direction : number, ) => {
        // 이전이면 direction = -1 , 다음 + 1
        let newMonth  = month + direction;
        let newYear = year;
        if(newMonth > 11) {
            newMonth = 0;
            newYear += 1; 
        } 
        if(newMonth < 0) {
            newMonth = 11;
            newYear -= 1;
        }
        const newDate = {
            year : newYear,
            month : newMonth,
        }
        // console.log(newMonth, '새로운달');
        // console.log(newYear, '새로운년');
        setCalendar(newDate);
    }
    return (
        <StyledCalendarRow  minHeight={"0vh"}>
            <StyledCalendarCol  xs={12} md={6}>{year}년 {month + 1} 월</StyledCalendarCol>
            {/* 이전, 다음 오늘 보여주는 버튼 */}
            <StyledCalendarCol  xs={12} md={6}>    
                <StyledArrow margin='0 15px 0 0' onClick={() => onClickArrowSetCalendar(-1)}>
                    <ArrowLeft size={30} />
                </StyledArrow>
                <Button variant="outline-secondary" onClick={() => resetCalendarState()}>Today</Button>                  
                <StyledArrow margin='0 0 0 15px' onClick={() => onClickArrowSetCalendar(1)}>
                    <ArrowRight size={30}/>
                </StyledArrow>                
            </StyledCalendarCol>
        </StyledCalendarRow>

    )
}


const StyledArrow = styled.div<StyledCalendarProps>`
  // 공통 스타일을 여기에 적용
    margin: ${({ margin }) => margin && margin};
    cursor: pointer;
`;


export default CalendarControls 
