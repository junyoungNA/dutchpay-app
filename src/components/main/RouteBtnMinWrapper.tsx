import { StlyedNavBtn } from '../../aseets/styled/RouteButtons/RouteBtns'
import { StyledButtonWrapper } from '../../aseets/styled/ButtonWrapper'
import { useRouter } from '../../hooks/useRouter';
import { TRouteBtnData } from '../../constants/routeBtnData';



export interface IRouteBtnMinWrapperProps extends Omit<TRouteBtnData, 'withAuth' | 'img'| 'subText'> {
}

const RouteBtnMinWrapper = ({routePath, lottie, text, color,} : IRouteBtnMinWrapperProps) => {
    const {routeTo} = useRouter();
    return (
        <StyledButtonWrapper onClick={() => routeTo(routePath)} background={color}> 
                {lottie && lottie()}
            <StlyedNavBtn width={'212px'} height={'40px'} background={color}>{text}</StlyedNavBtn>
        </StyledButtonWrapper>
    )
}

export default RouteBtnMinWrapper
