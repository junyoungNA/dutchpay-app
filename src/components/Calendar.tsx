import {  useEffect, useState } from 'react';
import { getDate,getFullYear, getMonth, getDay } from '../util/getCurrentDate';
import changeDate from '../util/changeDate';

const Calendar = () => {
    const [totalDate , setTotalDate] = useState();
    useEffect(() => {
        console.log(changeDate(getMonth()));
        // setTotalDate(changeDate()));
        }, []);
    return (
        <div>
            캘린더 입니다.
        </div>
    )
}

export default Calendar
