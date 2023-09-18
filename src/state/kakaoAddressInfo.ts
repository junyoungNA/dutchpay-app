import {atom} from 'recoil';

export interface IKakaoAddressInfo  {
    address_name?: string,
    region_2depth_name?: string,
    lat: number, //x
    lng: number  //y
}

export const kakaoAddressInfoState = atom({
    key: 'kakaoAdressInfo', // unique ID (with respect to other atoms/selectors)
    default: { lat: 33.5563, lng: 126.79581 , address_name:'', region_2depth_name :'' } as IKakaoAddressInfo, // default value (aka initial value)
});