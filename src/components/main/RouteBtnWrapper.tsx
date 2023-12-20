import React from 'react'
import { StlyedNavBtn } from '../../aseets/styled/RouteButtons/RouteBtns'
import { StyledButtonWrapper } from '../../aseets/styled/ButtonWrapper'
import { useRouter } from '../../hooks/useRouter';
import { TRouteBtnData } from '../../constants/routeBtnData';



export interface IRouteBtnWrapperProps extends Omit<TRouteBtnData, 'withAuth' | 'img'> {
    
}

const RouteBtnWrapper = ({routePath, lottie, text, color,} : IRouteBtnWrapperProps) => {
    const {routeTo} = useRouter();
    return (
        <StyledButtonWrapper onClick={() => routeTo(routePath)} background={color}> 
                {lottie()}
            <StlyedNavBtn background={color}>{text}</StlyedNavBtn>
        </StyledButtonWrapper>
    )
}

export default RouteBtnWrapper
