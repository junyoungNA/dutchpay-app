import styled from 'styled-components'

const ServiceLogo = () => {
    return (
        <>
            <StyledLogo>
                Plan B
            </StyledLogo>
            <StyledGreetings>안녕하세요~ 플랜 B를 통해 <br/>언제든 계획을 수립하고 기록해보세요</StyledGreetings>
        </>
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
const StyledGreetings = styled.div`
    font-weight:500;
    font-size: 16px;
    text-align: center;
    line-height: 30px;
    white-space: pre;
`


export default ServiceLogo
