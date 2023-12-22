import { StlyedNavBtn } from '../../aseets/styled/RouteButtons/RouteBtns'
import { StyledButtonWrapper } from '../../aseets/styled/ButtonWrapper'
import { useRouter } from '../../hooks/useRouter';
import { TRouteBtnData } from '../../constants/routeBtnData';



export interface IRouteBtnWrapperProps extends Omit<TRouteBtnData, 'withAuth' | 'img'| 'subText'| 'lottie'> {
}

const RouteBtnWrapper = ({routePath, text, title, color,} : IRouteBtnWrapperProps) => {
    const {routeTo} = useRouter();
    return (
        <StyledButtonWrapper onClick={() => routeTo(routePath)} background={color}> 
            <StlyedNavBtn  width={'212px'} hover={'true'}  height={'40px'} background={'#fff'}>{title}</StlyedNavBtn>
        </StyledButtonWrapper>
    )
}

export default RouteBtnWrapper
