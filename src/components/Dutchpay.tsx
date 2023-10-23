import { useEffect } from 'react';
import CenteredOverlayForm from './CenteredOverlayForm';
import { getUserGroups } from '../util/api/api';
import { useRecoilValue } from 'recoil';
import { kakaoUser } from '../state/kakaoUser';


const Dutchpay= () => {
    const {idUser} = useRecoilValue(kakaoUser);

    const fetchData = async (idUser : string) => {
        try {
            const exsitingGroup: any = await getUserGroups(idUser);
            console.log(exsitingGroup, '존재하는 그룹');
            return exsitingGroup;
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
            title='더치페이 그룹 목록'
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
