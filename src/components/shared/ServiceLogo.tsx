import { useRecoilValue } from 'recoil'
import styled from 'styled-components'
import { kakaoUser } from '../../atom/kakaoUser'

const ServiceLogo = () => {
    const {nickname} = useRecoilValue(kakaoUser);
    return (
        <>
            <StyledLogo>
                Plan B
            </StyledLogo>
            <StyledGreetings> { nickname !== undefined && <StyledUserName>{nickname}님</StyledUserName>} 안녕하세요~ <br/>플랜 B를 통해 언제든 계획을 수립하고 기록해보세요</StyledGreetings>
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
const StyledUserName = styled.span `
    font-weight: 700;
`
const StyledGreetings = styled.div`
    font-weight:500;
    font-size: 16px;
    text-align: center;
    line-height: 30px;
    white-space: pre;
`


export default ServiceLogo
