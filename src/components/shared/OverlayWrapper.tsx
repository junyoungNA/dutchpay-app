import React, { ReactNode } from 'react'
import styled from 'styled-components';

interface OverlayWrapperProps {
    children: ReactNode;
    padding? : string;
    minheight? : string;
    maxheight? : string;
    overflowY?: string;
    height?:string;
    margin?: string;
}

const OverlayWrapper = ({children, padding, minheight,maxheight, overflowY, margin} : OverlayWrapperProps) => {
    return (
        <StyledContainer maxheight={maxheight} overflowY={overflowY} minHeight={minheight} padding={padding} >
            {children}
        </StyledContainer>
    )
}

interface StyledContainerProps {
    minHeight? :  string
    padding? : string
    maxheight? : string;
    overflowY?: string;
    height?:string;
    margin?: string;
}

const StyledContainer = styled.div<StyledContainerProps>`
    padding: ${(props) => props.padding || '5vw'};
    border-radius: 15px;
    background-color: white; 
    min-width: 400px;
    filter : drop-shadow(0px 4px 4px rgba(0,0,0,0.25));
    min-height:${(props) => props.minHeight || '0'} ;
    max-height: ${(props) => props.maxheight || 'none'};
    overflow: ${(props) => props.overflowY || 'none'};;
    margin :  ${(props) => props.margin || 'none'};;
`

export default OverlayWrapper
