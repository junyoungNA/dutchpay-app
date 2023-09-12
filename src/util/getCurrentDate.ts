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


//이번달의 마지막 날짜 구하기
export function getThisLasyDate (year:number , month : number) {
    return new Date(year, month, 0).getDate();
};

//이번달의 마지막 요일 구하기
export function getThisLasyDay (year:number, month : number) {
    return new Date(year, month, 0).getDay();
};

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

