import { StyledCalendarDateCol, StyledCalendarRow } from './Calendar';

const CalendarDate = () => {
    const DATE_ARR = ['일','월','화','수','목','금','토',];
    return (
        <StyledCalendarRow  minHeight={"0vh"}>
                    {DATE_ARR.map((day, index) => 
                        { 
                            switch(day) {
                                case '일' : 
                                return (
                                    <StyledCalendarDateCol xs={1}   key={day} color='#b61233'>{day}</StyledCalendarDateCol>
                                );
                                case '토' :
                                return (
                                    <StyledCalendarDateCol xs={1} key={day} color='#0a6ba3' >{day}</StyledCalendarDateCol>
                                    );
                                default :
                                return (<StyledCalendarDateCol xs={1} key={day}>{day}</StyledCalendarDateCol>);
                            }
                        }
                    )}
        </StyledCalendarRow>
        )
}

export default CalendarDate
