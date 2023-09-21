import {atom} from 'recoil';

export interface IKakaoAddressInfo  {
    address_name?: string,
    region_2depth_name?: string,
    x: number, //x
    y: number  //y
    category_group_code?: string,
    category_group_name?: string,
    category_name?: string,
    distance ?: string,
    id?: string,
    phone?: string,
    place_name?: string,
    place_url?: string,
    road_address_name?: string
}

const defaultValue = {
    address_name: '',
    region_2depth_name : '',
    x:37.5535, //x
    y: 126.9690 ,//y
    category_group_code: '',
    category_group_name: '',
    category_name : '',
    distance  : '',
    id:'',
    phone:'',
    place_name: '',
    place_url: '',
    road_address_name: '',
}

export const kakaoAddressInfoState = atom({
    key: 'kakaoAdressInfo', // unique ID (with respect to other atoms/selectors)
    default: defaultValue as IKakaoAddressInfo, // default value (aka initial value)
});