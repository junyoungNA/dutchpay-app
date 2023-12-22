import { StyledBootStrapRow } from '../../aseets/styled/BootStrapRow'
import routeBtnData, { TRouteBtnData } from '../../constants/routeBtnData'
import { useRecoilValue } from 'recoil'
import { kakaoUser } from '../../atom/kakaoUser'
import NaviSideItem from './NaviSideItem'

const NaviSideContainer = () => {
    const {nickname} = useRecoilValue(kakaoUser);
    
    const authCheckRenderItem = ({ withAuth } : {withAuth: boolean} ) => {
        return !withAuth || nickname;
    };
    
    return (
        <StyledBootStrapRow gap={'15px'} minHeight={'400px'}>
            {routeBtnData.map((btnData: TRouteBtnData ,idx:number) => (
                authCheckRenderItem(btnData) && <NaviSideItem {... btnData} idx={idx}/>
            ))}
        </StyledBootStrapRow> 
    )
}

export default NaviSideContainer

