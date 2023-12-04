import {atom} from 'recoil';
import { getCalendarMonth, getFullYear, getDate } from '../util/getCurrentDate';

// 캘린더 전역상태
type TypeCalendarDate = {
    year : number;
    month : number;
    day? : number;
}
const year = getFullYear();
const month = getCalendarMonth();
const day = getDate();

export const calendarDateState = atom({
    key: 'calendarDate', // unique ID (with respect to other atoms/selectors)
    default: { year, month, day} as TypeCalendarDate, // default value (aka initial value)
});