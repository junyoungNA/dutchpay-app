import { IExpenseState } from "../atom/expenses";


// expenses  recoilState에 있는 멤버가 낸 금액 정보
// amountPerPerson  총 낸 금액/ 멤버 수 
// member 총 멤버수
interface IMinTransaction {
    receiver: string;
    sender : string
    amount : number;    
}

interface IMembersToPay {
    [member : string] : number;
}

export const calculatteMinimumTransaction = (expenses : IExpenseState[], members : string[], amountPerPerson : number) => {
    const  minTransaction : IMinTransaction[] = [] ;    

    if(amountPerPerson === 0) {
        return minTransaction;
    } 
    // 1. 사람별로 냈어야 할 금액
    const membersToPay : IMembersToPay = {};
    members.forEach(member => {
        membersToPay[member] = amountPerPerson;
    });
    // 2. 사람별로 냈어야 할 금액 업데이트
    expenses.forEach(({payer, amount})  => {
        membersToPay[payer] -= amount; //낸 값에서 내야할값을 빼준다
    });

    //3. 계산된 membersToPay를 오름차순으로 정렬
    const sortedMembersToPay = Object.keys(membersToPay)
        .map((member) => (
            {member : member, amount : membersToPay[member]}
        ))
        .sort((a, b) => a.amount - b.amount); 
    //4. 정렬된 sortedMembersToPay 에서 보내야할 금액 멤버(양수) 받어여헐 금액 멤버(음수) 서로 계산
    let left = 0;
    let right = sortedMembersToPay.length - 1;
    while(left < right) {
        // 받는쪽 금액이 0원일때 계속해서 다음 받아야할 금액, 인덱스로 이동
        while(left < right && sortedMembersToPay[left].amount === 0) {
            left++
        }
        // 보내야할 금액이 0원이라면 다음 보내야할 금액, 인데스로 이동
        while(left < right && sortedMembersToPay[right].amount === 0) {
            right--
        }
        const toReceive = sortedMembersToPay[left];
        const toSend = sortedMembersToPay[right];
        const amountToReceive = Math.abs(toReceive.amount); //음수와 양수를 계산하므로 절대값
        const amountToSend = Math.abs(toSend.amount);

        if(amountToSend > amountToReceive) {
            // 보내야할 금액이 받아야할돈보다 클때?
            minTransaction.push({
                receiver : toReceive.member,
                sender : toSend.member,
                amount: Math.floor(amountToReceive),
            });
            //보낼 수 있는 금액을 다보내주었기 때문에 받을 금액을 0으로 만든다
            toReceive.amount = 0;
            //보내는 멤버의 금액에서 보낼 금액을 빼준다
            toSend.amount -= amountToReceive; 
            left++ //첫번째 멤버의 정산은 끝으로 다음 멤버로 간다
            
        } else {
            // 받아야할 금액이 보내야할 금액보다 클때
            minTransaction.push({
                receiver : toReceive.member,
                sender : toSend.member,
                amount: Math.floor(amountToSend),
            });
            // 다 보내줄 것이므로 보내는 금액을 0으로 만든다
            toSend.amount = 0;
            toReceive.amount += amountToSend; //받는 금액은 음수 보내는 금액은 양수이기 때문에 +
            // 마지막쪽 인데스에서 첫번째 쪽 인덱스로 이동
            right--
        }
    }
    return minTransaction;
}