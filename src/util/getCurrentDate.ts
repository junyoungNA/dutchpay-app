export  function getCurrnetDate () {
    const today = new Date();
    return today;
}

export function getMonth () {
    const moth = getCurrnetDate().getMonth() + 1;
    return moth;
}

export function getDate () {
    const date = getCurrnetDate().getDate();
    return date;
}

export function getFullYear () {
    const year = getCurrnetDate().getFullYear();
    return year;
}


export function getDay () {
    const day = getCurrnetDate().getDay();
    return day;
}

function addZeroDate (getCallback : () => number) {
    const LIMIT_NUM = 10
    const customDate = getCallback() < LIMIT_NUM ?  '0' + String(getCallback()) : getCallback();
    return customDate;
}

export default function getCalenderDate () {
    const today = getCurrnetDate();
    const customMonth = addZeroDate(getMonth);
    const customDay = addZeroDate(getDate);
    const customDate = [today.getFullYear(),customMonth, customDay].join('-');
    return customDate;
}

