import { useEffect } from "react"
import { getData } from "../../../util/api/apiInstance";
import { useRecoilValue } from "recoil";
import { kakaoUser } from "../../../atom/kakaoUser";
import Calendar from "../../calendar/Calendar";

const PlanRecordTab = () => {
    const {idUser} = useRecoilValue(kakaoUser);

    useEffect(() => {
        getUsersPlanRecord();
    },[]);

    const getUsersPlanRecord = async() => {
        try {
            const response = await getData(`/plan?idUser=${idUser}`);
            console.log(response, idUser, 'getUsersPlanRecord');
        }catch(error : any) {
            console.log(error,'유저 계획가져오기 실패');
        }
    }

    return (
        <Calendar/>
    )
}

export default PlanRecordTab
