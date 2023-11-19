import {atom} from 'recoil';
import getCalenderDate from '../util/getCurrentDate';

const currentDate = getCalenderDate().split('-').map(Number);
const dateObject = {
    currentYear: currentDate[0],
    currentMonth: currentDate[1] - 1,
    currentDate: currentDate[2]
};

export const currentDateState = atom({
    key: 'currentDate', // unique ID (with respect to other atoms/selectors)
    default: dateObject, // default value (aka initial value)
});