import { useEffect } from 'react';
import CenteredOverlayForm from './CenteredOverlayForm';
import { getUserGroups } from '../util/api/api';

const Dutchpay = () => {

    const fetchData = async (idUser : string, groupName : string) => {
        try {
            const exsitingGroup: any = await getUserGroups(idUser);
            console.log(exsitingGroup, '존재하는 그룹');
            return exsitingGroup;
        } catch (error : any) {
            console.log(error,'에러 발생');
        }
    };
    useEffect(() => {
        
    }, [])
    return (
        <CenteredOverlayForm    
            title='먼저, 더치 페이 할 그룹의 이름을 정해주세요'
        >
            <div>

            </div>
            {/* <ExsitingGroups
                userGroups ={}
                nickname={}
            /> */}
        </CenteredOverlayForm> 
    )
}

export default Dutchpay
