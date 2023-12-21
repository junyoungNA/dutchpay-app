import styled from 'styled-components'

const ServiceLogo = () => {
    return (
        <StyledLogo>
            Plan of 
            <span>&nbsp;P</span>
        </StyledLogo>
    )
}

const StyledLogo = styled.h1` 
    font-size:  53px;
    font-weight: 900;
    letter-spacing: 5px;
    color: #40414f;
    line-height: 30px;
    text-align: center;
    margin: 11px 0;
    color: #c9c9c9;
    white-space: nowrap;

    span {
        color: rgb(175, 19, 0);
        font-size: 65px;
    }
`
export default ServiceLogo
