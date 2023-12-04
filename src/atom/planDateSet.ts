import {atom} from 'recoil';
import getCalenderDate from '../util/getCurrentDate';

//makePlanTab에서 계획작성한후 planRecord으로 탭으로 이동 후
//지금 만든 계획(plan)의 date를 설정하므로 해당 계획으로 바로 보여주기
// 이 기능을 위해 atom을 만들었는데? 다른방법은?
const currentDate = getCalenderDate();
export const planDateAtom = atom({
    key: 'planDateAtom', 
    default: currentDate as string,
});