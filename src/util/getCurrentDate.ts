export  function getCurrnetDate () {
    const today = new Date();
    return today;
}


//표기를 위한 월의 + 1
export function getMonth () {
    const month = getCurrnetDate().getMonth() + 1;
    return month;
}

//캘린더를 위한 getMonth
export function getCalendarMonth () {
    const month = getCurrnetDate().getMonth();
    return month;
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
    return new Date(year, month + 1, 0).getDate();
};

//이번달의 마지막 요일 구하기
export function getThisLasyDay (year:number, month : number) {
    return new Date(year, month, 0).getDay();
};

//이번달의 첫번째 요일 구하기
export function getFirstDayOfWeek(year:number, month : number) {
    // 월은 0부터 시작하므로, 월을 0부터 11까지로 설정
    const firstDayOfMonth = new Date(year, month, 1);

    // getDay() 메소드를 사용하여 해당 날짜의 요일을 얻음 (0은 일요일, 1은 월요일, ...)
    const firstDayOfWeek = firstDayOfMonth.getDay();

    return firstDayOfWeek;
}

export function addZeroDate (getCallback : () => number) {
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

