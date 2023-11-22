import React, { ReactNode } from 'react'
import styled from 'styled-components';

interface OverlayWrapperProps {
    children: ReactNode;
    padding? : string;
    minheight? : string;
    maxheight? : string;
    overflowY?: string;
    height?:string;
}

const OverlayWrapper = ({children, padding, minheight,maxheight, overflowY} : OverlayWrapperProps) => {
    return (
        <StyledContainer maxheight={maxheight} overflowY={overflowY} minheight={minheight} padding={padding} >
            {children}
        </StyledContainer>
    )
}

interface StyledContainerProps {
    minheight? :  string
    padding? : string
    maxheight? : string;
    overflowY?: string;
    height?:string;
}

const StyledContainer = styled.div<StyledContainerProps>`
    padding: ${(props) => props.padding || '5vw'};
    border-radius: 15px;
    background-color: white; 
    filter : drop-shadow(0px 4px 4px rgba(0,0,0,0.25));
    min-height:${(props) => props.minheight || '0'} ;
    max-height: ${(props) => props.maxheight || 'none'};
    /* height: ${(props) => props.height || '73vh'}; */
    overflow: ${(props) => props.overflowY || 'none'};;
`

export default OverlayWrapper
