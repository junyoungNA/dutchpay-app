import {atom} from 'recoil';
import { getCalendarMonth, getFullYear } from '../util/getCurrentDate';

type TypeCalendarDate = {
    year : number;
    month : number;
}
const year = getFullYear();
const month = getCalendarMonth();

export const calendarDateState = atom({
    key: 'calendarDate', // unique ID (with respect to other atoms/selectors)
    default: { year, month} as TypeCalendarDate, // default value (aka initial value)
});