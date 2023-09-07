import React, { ReactNode } from 'react'
import styled from 'styled-components';

interface OverlayWrapperProps {
    children: ReactNode;
    padding? : string;
    minheight? : string;
}

const OverlayWrapper = ({children, padding, minheight} : OverlayWrapperProps) => {
    return (
        <StyledContainer minheight={minheight} padding={padding} >
            {children}
        </StyledContainer>
    )
}

interface StyledContainerProps {
    minheight? :  string
    padding? : string
}

const StyledContainer = styled.div<StyledContainerProps>`
    padding: ${(props) => props.padding || '5vw'};
    border-radius: 15px;
    background-color: white; 
    filter : drop-shadow(0px 4px 4px rgba(0,0,0,0.25));
    min-height:${(props) => props.minheight || '0'} ;
`

export default OverlayWrapper
