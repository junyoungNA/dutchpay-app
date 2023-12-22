import { StyledBootStrapRow } from '../../aseets/styled/BootStrapRow'
import { StyledBootStrapCol } from '../../aseets/styled/BootStrapCol'
import { StyledBootStrapImage } from '../../aseets/styled/BootStrapImage'
import routeBtnData, { TRouteBtnData } from '../../constants/routeBtnData'
import RouteBtnWrapper from './RouteBtnWrapper'
import { StyledGreetings } from '../../aseets/styled/BootStrapGreetings'
import { StyledBootStrapLayoutWrapper } from '../../aseets/styled/BootStrapLayoutWrapper'
import { useRecoilValue } from 'recoil'
import { kakaoUser } from '../../atom/kakaoUser'
import RouteBtnGroups from './RouteBtnGroups'

const NaviSide = () => {
    const {nickname} = useRecoilValue(kakaoUser);
    return (
        <StyledBootStrapRow gap={'15px'} minHeight={'400px'}>
            {routeBtnData.map(({text, title, subText, color, routePath, lottie, img, withAuth} : TRouteBtnData ,idx:number) => (
                withAuth && !nickname  ? null : 
                <StyledBootStrapCol hover={'true'} md={3} height={'400px'} flex={'flex'} key={idx}>
                    <StyledBootStrapImage src={img} height={'400px'} rounded/>
                    <StyledBootStrapLayoutWrapper position={'absolute'} top={'55%'} left={'50%'}>
                            <StyledGreetings fontSize='22px' fontWeight='800' color={'#fff'}>
                                {subText}
                            </StyledGreetings>
                            <RouteBtnWrapper routePath={routePath} color={'none'} text={text} title={title}  />
                    </StyledBootStrapLayoutWrapper>
                </StyledBootStrapCol>
            ))}
        </StyledBootStrapRow>
    )
}

export default NaviSide
