import styled from 'styled-components'

const PersonalizedMsg = ({ nickname } : {nickname : string}) => {
    return (
        <>
            <StyledUserName>{nickname}님</StyledUserName>
            &nbsp;Plan of P와 함께 <br />
            이 세상에 모든 계획에 맞서주십쇼
        </>
    )
}

const StyledUserName = styled.span `
    font-size: 20px;
    color: #979595;
    font-weight: 900;
`

export default PersonalizedMsg
