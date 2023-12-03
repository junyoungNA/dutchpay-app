import { useCallback } from "react";
import { getPlanRecord } from "../util/api/api";
import { useRecoilValue } from "recoil";
import { kakaoUser } from "../atom/kakaoUser";

const useFetchGetUsersPlan = () => {
    const {idUser} = useRecoilValue(kakaoUser);
    const getUsersPlanRecordFetch = useCallback(async (customDate: string) => {
        try {
            const userPlanRecord = await getPlanRecord(idUser, customDate);
            return userPlanRecord;
        } catch (error: any) {
            console.log(error, '유저 계획 가져오기 실패');
        }
    }, [idUser]);
    
    return getUsersPlanRecordFetch;
};

export default useFetchGetUsersPlan;