import {  useEffect, useState } from 'react';
import { getCalendarMonth, getThisLasyDay } from '../util/getCurrentDate';
import changeDate from '../util/changeDate';
import OverlayWrapper from './shared/OverlayWrapper';
import { Col, Row } from 'react-bootstrap';
import styled from 'styled-components';

const Calendar = () => {
    const DATE_ARR = ['일','월','화','수','목','금','토',];
    const [totalDate , setTotalDate] = useState<number[][]>([]);
    console.log(totalDate, '전채날짜');
    useEffect(() => {
        setTotalDate(changeDate(getCalendarMonth()));
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
                {totalDate?.map((_, index) => 
                    <StyledCalendarRow key={index}>
                        {totalDate[index]?.map((day) => 
                            <StyledCalendarCol xs={1} >{day}</StyledCalendarCol>
                        )}
                </StyledCalendarRow>
                )}
           
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
