import {  useEffect, useState } from 'react';
import { getFullYear, getMonth, getThisLasyDay } from '../util/getCurrentDate';
import changeDate from '../util/changeDate';
import OverlayWrapper from './shared/OverlayWrapper';
import { Col, Row } from 'react-bootstrap';
import styled from 'styled-components';

const Calendar = () => {
    const CALENDAR_ROW = [0,1,2,3,4];
    const DATE_ARR = ['일','월','화','수','목','금','토',];
    const LASY_DAY = getThisLasyDay(getFullYear(), getMonth());
    const [totalDate , setTotalDate] = useState<number[][]>([]);
    console.log('이번달 시작 요일', LASY_DAY);
    useEffect(() => {
        setTotalDate(changeDate(getMonth()));
        }, []);
    return (
        <OverlayWrapper>
            <StyledCalendarRow>
                {DATE_ARR.map((day, index) => 
                    { 
                        switch(day) {
                            case '일' : 
                            return (
                                <StyledCalendarCol xs={1} md={1} lg={1} key={day} color='#b61233'>{day}</StyledCalendarCol>
                            );
                            case '토' :
                            return (
                                <StyledCalendarCol xs={1} md={1} lg={1} key={day} color='#0a6ba3'>{day}</StyledCalendarCol>
                                );
                            default :
                            return (<StyledCalendarCol xs={1} md={1} lg={1} key={day}>{day}</StyledCalendarCol>);
                        }
                    }
                )}
            </StyledCalendarRow>
            {CALENDAR_ROW.map(row => 
                <StyledCalendarRow key={row} >
                    {totalDate[row]?.map((day) => 
                        <StyledCalendarCol xs={1} >{day}</StyledCalendarCol>
                    )}
                </StyledCalendarRow>
            )};
        </OverlayWrapper>
    )
}

export default Calendar

interface StyledCalendarColProps {
    color? : string;
}

const StyledCalendarRow = styled(Row)`
    font-size: 20px;
    font-weight: 700;
    display: flex;
    justify-content: center;
    
`

const StyledCalendarCol = styled(Col)<StyledCalendarColProps>`
    text-align: start;
    color :  ${({color}) => (color ? color : 'black')};
`
