import {getData} from './apiInstance';

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