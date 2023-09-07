import React from 'react'
import styled from 'styled-components'

const ServiceLogo = () => {
    return (
        <StyledLogo>
            Plan B
        </StyledLogo>
    )
}

const StyledLogo = styled.h1` 
    font-weight:200;
    letter-spacing: 7px;
    color: #212121;
    line-height: 30px;
    text-align: center;
    margin: 11px 0;
`

export default ServiceLogo
