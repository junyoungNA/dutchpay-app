import {  useEffect, useState } from 'react';
import { getMonth } from '../util/getCurrentDate';
import changeDate from '../util/changeDate';
import OverlayWrapper from './shared/OverlayWrapper';
import { Col, Row, Table } from 'react-bootstrap';
import styled from 'styled-components';

const Calendar = () => {
    const date = ['일','월','화','수','목','금','토',];
    const [totalDate , setTotalDate] = useState<number[]>([]);
    useEffect(() => {
        setTotalDate(changeDate(getMonth()));
        }, []);
    return (
        <OverlayWrapper minheight={'73vh'} padding='100px'>
            <StyledCalendarRow>
                {date.map((day) => 
                    { 
                        switch(day) {
                            case '일' : 
                            return (<StyledCalendarCol key={day} color='#b61233'>{day}</StyledCalendarCol>);
                            case '토' :
                            return (<StyledCalendarCol key={day} color='#0a6ba3'>{day}</StyledCalendarCol>);
                            default :
                            return (<StyledCalendarCol key={day}>{day}</StyledCalendarCol>);
                        }
                        
                    }
                )}
            </StyledCalendarRow>
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
`

const StyledCalendarCol = styled(Col)<StyledCalendarColProps>`
    text-align: center;
    color :  ${({color}) => (color ? color : 'black')};
`
