import axios from "axios";
import { useEffect } from "react"
import { getData } from "../../../util/api/apiInstance";
import { useRecoilValue } from "recoil";
import { kakaoUser } from "../../../atom/kakaoUser";

const PlanRecordTab = () => {
    const {idUser} = useRecoilValue(kakaoUser);
    useEffect(() => {

    });

    const getUsersPlanRecord = async() => {
        try {
            const response = await getData(`/plan?idUser=${idUser}`);
            console.log(response);
        }catch(error : any) {
            console.log(error,'유저 계획가져오기 실패');
        }
    }

    return (
        <div>

        </div>
    )
}

export default PlanRecordTab
