import { StyledBootStrapCol } from '../../aseets/styled/BootStrapCol'
import { StyledGreetings } from '../../aseets/styled/BootStrapGreetings'
import { StyledBootStrapImage } from '../../aseets/styled/BootStrapImage'
import { StyledBootStrapLayoutWrapper } from '../../aseets/styled/BootStrapLayoutWrapper'
import { TRouteBtnData } from '../../constants/routeBtnData'
import RouteBtnWrapper from '../main/RouteBtnWrapper'


interface INaviSideItemProps extends Omit<TRouteBtnData, 'withAuth' | 'color'| 'lottie'> {
    idx: number;
}

const NaviSideItem = ({img, subText, routePath, text, title, idx} : INaviSideItemProps) => {
    return (
        <StyledBootStrapCol hover={'true'} md={3} height={'400px'} flex={'flex'} key={idx}>
            <StyledBootStrapImage src={img} height={'400px'} rounded/>
            <StyledBootStrapLayoutWrapper position={'absolute'} top={'55%'} left={'50%'}>
                    <StyledGreetings fontSize='22px' fontWeight='800' color={'#fff'}>
                        {subText}
                    </StyledGreetings>
                    <RouteBtnWrapper routePath={routePath} color={'none'} text={text} title={title}  />
            </StyledBootStrapLayoutWrapper>
        </StyledBootStrapCol>
    )
}

export default NaviSideItem
