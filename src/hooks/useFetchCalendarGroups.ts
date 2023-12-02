import { useCallback } from "react";
import { getCalendarGroups } from "../util/api/api";
import { useRecoilValue } from "recoil";
import { kakaoUser } from "../atom/kakaoUser";

const useFetchGetUsersGroups = () => {
    const {idUser} = useRecoilValue(kakaoUser);
    const getUsersGroupsFetch = useCallback(async (customDate: string) => {
        try {
            const userGroups= await getCalendarGroups(idUser, customDate);
            return userGroups;
        } catch (error: any) {
            console.log(error, '유저 계획 가져오기 실패');
        }
    }, [idUser]);
    
    return getUsersGroupsFetch;
};

export default useFetchGetUsersGroups;