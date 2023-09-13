import {  useEffect, useState } from 'react';
import changeDate from '../util/changeDate';
import OverlayWrapper from './shared/OverlayWrapper';
import { Button, Col, Row } from 'react-bootstrap';
import styled from 'styled-components';
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import { calendarDateState } from '../state/calendarDate';
import { ArrowRight, ArrowLeft } from 'react-bootstrap-icons';
import { kakaoUser } from '../state/kakaoUser';
import { getCalendarGroups, getGroupMembers } from '../util/api/api';

const Calendar = () => {
    const {idUser,nickname} = useRecoilValue(kakaoUser);
    const [userGroups, setUserGroups] = useState([]);
    const [{year, month, currentDate}, setCalendar] = useRecoilState(calendarDateState);

    const customDate = `${year}-${month < 10 ? '0'+ (month + 1): month + 1}`; //yyyy-mm;
    console.log(customDate);
    const getGroupMemberFetch = async(idUser : string) => {
        const resultGroups: any = await getCalendarGroups(idUser, customDate);
        console.log(resultGroups,'유저의 그룹들');
        setUserGroups(resultGroups);
    }
    const DATE_ARR = ['일','월','화','수','목','금','토',];
    const [totalDate , setTotalDate] = useState<number[][]>([]);

  // useResetRecoilState로 초기화 함수 가져오기
    const resetCalendarState = useResetRecoilState(calendarDateState);
    useEffect(() => {
        if(idUser) {
            getGroupMemberFetch(idUser);
        }
        setTotalDate(changeDate(year, month));
        }, [year, month]);

    const onClickArrowSetCalendar = (dircection : number, ) => {
        // 이전이면 direction = -1 , 다음 + 1
        let newMonth  = month + dircection;
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
            currentDate : - 1 //현재 날짜는 -1로 설정
        }
        // console.log(newMonth, '새로운달');
        // console.log(newYear, '새로운년');
        setCalendar(newDate);
    }
    return (
        <OverlayWrapper minheight='90%'>
            <StyledCalendarRow>
                <StyledCalendarCol xs = {5}>{year}년 {month + 1} 월</StyledCalendarCol>
                {/* 이전, 다음 오늘 보여주는 버튼 */}
                <StyledCalendarCol xs = {2}>    
                    <StyledArrow margin='0 15px 0 0' onClick={() => onClickArrowSetCalendar(-1)}>
                        <ArrowLeft size={30} />
                    </StyledArrow>
                    <Button variant="outline-secondary" onClick={() => resetCalendarState()}>Today</Button>                  
                    <StyledArrow margin='0 0 0 15px' onClick={() => onClickArrowSetCalendar(1)}>
                        <ArrowRight size={30}/>
                    </StyledArrow>                
                </StyledCalendarCol>
            </StyledCalendarRow>
            <StyledCalendarRow>
                {DATE_ARR.map((day, index) => 
                    { 
                        switch(day) {
                            case '일' : 
                            return (
                                <StyledCalendarCol xs={1}  key={day} color='#b61233'>{day}</StyledCalendarCol>
                            );
                            case '토' :
                            return (
                                <StyledCalendarCol xs={1} key={day} color='#0a6ba3'>{day}</StyledCalendarCol>
                                );
                            default :
                            return (<StyledCalendarCol xs={1} key={day}>{day}</StyledCalendarCol>);
                        }
                    }
                )}
            </StyledCalendarRow>
                {totalDate?.map((_, index) => 
                    <StyledCalendarRow key={index}>
                        {totalDate[index]?.map((day, index) => 
                            day === 0 ? 
                            <StyledCalendarCol xs={1} key={index} ></StyledCalendarCol>
                            : 
                            currentDate === day ? 
                                <StyledCalendarCol xs={1} key={index} color='#ae7df9'>{day}</StyledCalendarCol>
                                :
                                <StyledCalendarCol xs={1} key={index}>{day}</StyledCalendarCol>
                        )}
                </StyledCalendarRow>
                )}
        </OverlayWrapper>
    )
}

export default Calendar

interface StyledCalendarColProps {
    color? : string;
    height? : string;
    border? : string;
}

interface StyledCalendarArrowProps {    
    margin? : string;
}


const StyledCalendarRow = styled(Row)`
    font-size: 20px;
    font-weight: 700;
    display: flex;
    justify-content: center;
    min-height : 100px;
    text-align: center;
`

const StyledCalendarCol = styled(Col)<StyledCalendarColProps>`
    text-align: start;
    display: flex;
    align-items: center;
    min-height: ${(height) => height && height};
    border: ${(border) => border && border};;
    color :  ${({color}) => (color ? color : 'black')};
`
const StyledArrow = styled.div<StyledCalendarArrowProps>`
  // 공통 스타일을 여기에 적용
    margin: ${({ margin }) => margin && margin};
    cursor: pointer;
`;
