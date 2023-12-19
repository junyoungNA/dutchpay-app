import { useRecoilValue } from 'recoil'
import styled from 'styled-components'
import { kakaoUser } from '../../atom/kakaoUser'

const ServiceLogo = () => {
    const {nickname} = useRecoilValue(kakaoUser);
    return (
        <>
            <StyledLogo>
                Plan of 
                <span>&nbsp;P</span>
            </StyledLogo>
            <StyledGreetings> { 
                nickname !== undefined ? 
                <>
                    <StyledUserName>
                        {nickname}님
                    </StyledUserName>
                    &nbsp;Plan of P와 함께 이 세상에 <br/>
                    모든 계획에 맞서주십쇼
                </>
                :
                <>
                    세상에 모든 P들이여 <br/>
                    끔찍한 계획에 도망치지말고<br/>
                    모든 계획에 맞서십시오<br/>
                </>
            } 
            </StyledGreetings>
        </>
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
const StyledUserName = styled.span `
    font-size: 20px;
    color: #979595;
    font-weight: 900;
`
const StyledGreetings = styled.div`
    color: #eeeded;
    font-weight:600;
    letter-spacing: 0.5px;
    font-size: 18px;
    text-align: center;
    line-height: 30px;
    white-space: pre;
`
export default ServiceLogo
