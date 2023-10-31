import { useEffect, useState } from 'react';
import CenteredOverlayForm from './CenteredOverlayForm';
import { getUserGroups } from '../util/api/api';
import { useRecoilValue } from 'recoil';
import { kakaoUser } from '../state/kakaoUser';
import ExsitingGroups from './ExsitingGroups';

export interface IUserGroups {
    groupName : string,
    groupMembers : string[],
    idUser : string,
}


const Dutchpay= () => {
    const {idUser, nickname} = useRecoilValue(kakaoUser);
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
        const result = fetchData(idUser);
        console.log(result);
    }, []);
    return (
        <CenteredOverlayForm    
            title={`${nickname}더치페이 그룹 목록`}
        >
            <ExsitingGroups userGroups ={userGroupsInfo}/>
        </CenteredOverlayForm> 
    )
}

export default Dutchpay
