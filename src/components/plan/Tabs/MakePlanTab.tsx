import React from 'react'
import { postData } from '../../../util/api/apiInstance'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { mapArrive } from '../../../atom/mapArrive'
import { mapDeparture } from '../../../atom/mapDeparture'
import { kakaoUser } from '../../../atom/kakaoUser'
import useFetchUserInfo from '../../../hooks/useFetchUserInfo '
import showAlert from '../../../util/shoAlert'
import { planDateAtom } from '../../../atom/planDateSet'
import usePlanForm from '../../../hooks/usePlanForm'
import PlanForm from './PlanForm'

export interface IMakePlanTabProps {
    handleTabSelect : (type : string) => void, 
}

const MakePlanTab:React.FC<IMakePlanTabProps> = ({handleTabSelect}) => {
    const arriveRecord = useRecoilValue(mapArrive);
    const departureRecord = useRecoilValue(mapDeparture);
    const {idUser} = useRecoilValue(kakaoUser);
    const fetchUserInfo = useFetchUserInfo();

    const setPlanDate = useSetRecoilState(planDateAtom); //현재 만들어진 계획이 있다면 이 날짜를 이용해 만든 계획 보여주기
    const {formStates, onFormChange, onReset, checkTitleAndDateValidated, isTitleValid, isDateValid} = usePlanForm({arriveRecord, departureRecord})
    const {title, date, startTime, endTime, content, departure, arrive } = formStates; 

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        try {
            event.preventDefault();
            if(!checkTitleAndDateValidated(title, date)) return;
            const planPayload = {
                title: title,
                date: date,
                departure: departure,
                arrive: arrive, 
                startTime:startTime,
                endTime: endTime,
                content: content,
                idUser : idUser,
            }
             // user token체크후 유효성검사 실패 시 메인페이지로 이동
            const {error} = await fetchUserInfo();
            if(error) return; //fetchUser에서 route처리;
            const {msg} : any  =  await postData('plan', planPayload);
            if(error === false) {
                showAlert(`${planPayload.title} 계획만들기 성공!. 계획 탭에서 확인하세요.`);
                setPlanDate(date);
                handleTabSelect('planRecord');
                onReset();
            }
        }catch(error) {
            console.log(error);
            showAlert('계획 만들기 오류');
        }
    }

    return <PlanForm
        handleSubmit={handleSubmit}
        formStates={formStates}
        onFormChange={onFormChange}
        isTitleValid={isTitleValid}
        isDateValid={isDateValid}
        handleTabSelect={handleTabSelect}
    />
}

export default MakePlanTab