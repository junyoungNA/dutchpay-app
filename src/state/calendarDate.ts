import {atom} from 'recoil';
import { getCalendarMonth, getDate, getFullYear } from '../util/getCurrentDate';

type TypeGroupMember = {
    year : number;
    month : number;
    currentDate : number;
}
const year = getFullYear();
const month = getCalendarMonth();
const currentDate = getDate();

export const calendarDateState = atom({
    key: 'calendarDate', // unique ID (with respect to other atoms/selectors)
    default: { year, month, currentDate} as TypeGroupMember, // default value (aka initial value)
});