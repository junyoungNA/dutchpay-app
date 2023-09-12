import { getFirstDayOfWeek, getFullYear, getThisLasyDate } from "./getCurrentDate";

const changeDate = (month : number) => {
    //이전 날짜는 보내지 않기 아직
    //이전 날짜
    const YEAR = getFullYear();
     // 월은 0부터 시작하므로, 월을 0부터 11까지로 설정
    const firstDayOfMonth = getFirstDayOfWeek(YEAR, month);
    const ThisLasyDate = getThisLasyDate(YEAR, month);
    //현재날짜
    //현재 달의 모든 날짜 생성 0은 slice를 통해 삭제
    const TD: any = [...Array(ThisLasyDate + 1).keys()].slice(1);
    
    //만든 date 값들 7의 배수로 쪼개 이중배열 만들기
    const WEEK_NUM = 7
    const result = [];
    //만약 첫주가 일요일부터 시작이 아니라면 
    //0으로 공백을 넣어주며 7 - 해당요일의 숫자만큼을 빼서
    //7일중에 공백을 뺀 나머지 일수가 들어간다.
    // 예시 - 9월 1일은 금요일 시작 금 === 5 
    // 5길이 만큼의 공백을 넣어주고 나머지는 1,2는 일수를 채운다.
    if(firstDayOfMonth > 0) {
        const gaptArr =new Array(firstDayOfMonth).fill(0);
        gaptArr.push(...TD.splice(0, WEEK_NUM - firstDayOfMonth));
        result.push(gaptArr);
    }
    //일수가 들어간 TD배열의 레이아웃 Row(5)보다 작을때까지
    //while문을 돌려서 7의 배수만큼 일수를 짤라 이중배열형태로 만든다.
    //마지막줄은 다시 공백을 넣어줘야한다!
    while(TD.length > 0) {
        const spliceArr = TD.splice(0, WEEK_NUM);
        result.push(spliceArr);

        if (TD.length === 0) {
            // 마지막 행일 경우, 부족한 요소를 0으로 채워 추가합니다.
            const gap = WEEK_NUM - spliceArr.length;
            if (gap > 0) {
                spliceArr.push(...new Array(gap).fill(0));
            }
        }
    }
    return result;
};


export default changeDate;