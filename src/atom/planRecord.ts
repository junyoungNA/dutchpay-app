import {atom} from 'recoil';

// 계획기록 전역상태
export type TPlan = {
    date : string,
    _id: string,
    arrive : string,
    content : string,
    departure: string,
    endTime : string,
    idUser : string,
    title : string,
    __v?:any
}

export const planRecord = atom({
    key: 'planRecord',
    default: [] as TPlan[], 
});