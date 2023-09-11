import { getFullYear } from "./getCurrentDate";

const changeDate = (month : number) => {
    //이전 날짜는 보내지 않기 아직
    //이전 날짜
    const YEAR = getFullYear();
    // const PVLastDate = new Date(YEAR, month - 1, 0).getDate(); //날짜 반환
    // const PVLastDay = new Date(YEAR, month - 1, 0).getDay(); //요일 반환
    //다음 날짜
    const ThisLasyDay = new Date(YEAR, month, 0).getDay();
    const ThisLasyDate = new Date(YEAR, month, 0).getDate();
    //이전달 날짜 만들기
    // const PVLD = [];
    //일요일은 0, 월요일 1 ~
    // 일요일 부터 토요일까지 0~6까지 범위를 잡고
    // 배열을 만들어둔 곳에 해당 월의 일수들을 unshift를 사용하여
    // 하나씩 축적해 줍니다.
    // if (PVLastDay !== 6) {
    //     for (let i = 0; i < PVLastDay + 1; i++) {
    //         PVLD.unshift(PVLastDate - i);
    //     }
    // }
    console.log(ThisLasyDay,'다음달이 오기전 마지막 요일');
    console.log(ThisLasyDate,'다음달이 오기전 마지막 날짜?');
    //다음달 날짜 만들기
    const TLD = [];
    for (let i = 1; i < 7 - ThisLasyDay; i++) {
        if (i === 0) {
            return TLD;
        }
        TLD.push(i);
    }

    console.log(TLD, '다음달?');
    //현재날짜
    //현재 달의 모든 날짜 생성 0은 slice를 통해 삭제
    const TD = [...Array(ThisLasyDate + 1).keys()].slice(1);
    console.log(TD, '모든 날짜');
    return TD.concat(TLD);
};


export default changeDate;