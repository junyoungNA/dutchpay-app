import { useEffect, useState } from 'react';
import CenteredOverlayForm from './CenteredOverlayForm';
import { getUserGroups } from '../util/api/api';
import { useRecoilValue } from 'recoil';
import { kakaoUser } from '../state/kakaoUser';
import ExsitingGroups from './ExsitingGroups';
import { useRouter } from '../hooks/useRouter';
import { ROUTES } from '../route/routes';

export interface IUserGroups {
    groupName : string,
    groupMembers : string[],
    idUser : string,
}


const Dutchpay= () => {
    const {idUser, nickname} = useRecoilValue(kakaoUser);
    const {routeTo} = useRouter();
    const [userGroupsInfo, setUserGroups] = useState<IUserGroups[]>([]);
    const fetchData = async (idUser : string) => {
        try {
            const  userGroups: IUserGroups[] = await getUserGroups(idUser);
            console.log(userGroups, '존재하는 그룹');
            setUserGroups(userGroups);
            return userGroups;
        } catch (error : any) {
            console.log(error,'에러 발생');
        }
    };
    useEffect(() => {
        const fetchDataAndHandleResult = async () => {
            try {
                const result = await fetchData(idUser);
                console.log(result);
                if (result === undefined || result.length === 0) {
                    routeTo(ROUTES.CREATE_GROUP)
                }
            } catch (error) {
                console.log(error, '에러 발생');
            }
        };
    
        fetchDataAndHandleResult();
    }, []);
    return (
        <CenteredOverlayForm    
            title={`${nickname}더치페이 그룹 목록`}
            route={() => routeTo(ROUTES.CREATE_GROUP)}
        >
            <ExsitingGroups userGroups ={userGroupsInfo}/>
        </CenteredOverlayForm> 
    )
}

export default Dutchpay
