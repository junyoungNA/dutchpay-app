import { deleteData, getData} from './apiInstance';

//MongoDB에서 expenses데이터 가져오기
export const getExpenses = async (idUser : string, groupName : string) => {
    try {
        const result = await getData(`expense?idUser=${idUser}&groupName=${groupName}`);
        return result;
    } catch(error:any) {
        throw new Error(error);
    } 
}


export const getGroupMembers = async (idUser : string) => {
    try {
        const result :any = await getData(`members?idUser=${idUser}`);
        return result;
    } catch(error : any) {
        // console.log(error, 'api호출 오류');
        throw new Error(error);
    } 
}


export const getUserGroups = async (idUser : string) => {
    try {
        const result :any = await getData(`groups?idUser=${idUser}`);
        return result;
    } catch(error : any) {
        console.log(error, 'api호출 오류');
        throw new Error(error);
    } 
}


//캘린더에 유저가 생성한 그룹들 날짜에 맞게 가져오기
export const getCalendarGroups = async (idUser : string , createdAt: string) => {
    try {
        const result :any = await getData(`calendarGroups?idUser=${idUser}&createdAt=${createdAt}`);
        const filterUserGroups = filterUserGroup(result);
        return filterUserGroups;
    } catch(error : any) {
        // console.log(error, 'api호출 오류');
        throw new Error(error);
    } 
}

export const getExsitingGroup = async (idUser : string, groupName : string) => {
    try {
        const result :any = await getData(`existingGroup?idUser=${idUser}&groupName=${groupName}`);
        // if (result && result.msg) {
        //     console.log('서버에서 오류 응답:', result.msg);
        //     throw new Error(result.msg);
        // }
        return result;
    } catch(error : any) {
        // console.log(error, 'api호출 오류');
        throw new Error(error);
    } 
}


export const deleteGroups = async (idUser : string, groupName : string) => {
    try {
        const result :any = await deleteData(`groups?idUser=${idUser}&groupName=${groupName}`);
        return result;
    } catch(error : any) {
        // console.log(error, 'api호출 오류');
        throw new Error(error);
    } 
}

export const deleteExpense = async (idUser : string, groupName : string, expenseName:string) => {
    try {
        const result :any = await deleteData(`expense?idUser=${idUser}&groupName=${groupName}&expenseName=${expenseName}`);
        return result;
    } catch(error : any) {
        // console.log(error, 'api호출 오류');
        throw new Error(error);
    } 
}

// 유저의 그룹 생성날짜와 받아온 totalDate의 날짜 데이터를 맵핑
const filterUserGroup = (resultGroups : any) => {
    if(!resultGroups) return;
    // const formattedDay = `${year}-${month + 1}-${day < 10 ? '0' + day : day}`;
    const filterUserGroups = resultGroups.map((group: any) => {
        const { createdAt, ...otherData } = group; // createdAt를 제외한 다른 데이터를 유지
        return {
            date :createdAt.slice(-2) , // 다른 데이터 유지
            group :otherData,
        };
    });
    return filterUserGroups;
}