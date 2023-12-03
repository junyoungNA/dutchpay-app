import {atom} from 'recoil';

export type TPlan = {
    date : string,
    _id: string,
    arrive : string,
    econtent : string,
    departure: string,
    endTime : string,
    idUser : string,
    title : string,
    
}

export const planRecord = atom({
    key: 'planRecord',
    default: [] as TPlan[], 
});