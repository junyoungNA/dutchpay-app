import {atom} from 'recoil';
import getCalenderDate from '../util/getCurrentDate';

// 현재날짜를 가져오기위한 전역상태 yyyy-mm-dd
const currentDate = getCalenderDate().split('-').map(Number);
const dateObject = {
    currentYear: currentDate[0],
    currentMonth: currentDate[1] - 1,
    currentDate: currentDate[2]
};

export const currentDateState = atom({
    key: 'currentDate',
    default: dateObject,
});