import { FormEvent, ReactNode }  from 'react'
import { Container,Row, Button } from 'react-bootstrap';
import styled from 'styled-components'
import OverlayWrapper from './shared/OverlayWrapper';
import { Form } from 'react-bootstrap';

interface CenteredOverlayFormProps {
    children: ReactNode;
    validated? : boolean,
    handleSubmit? : (event : FormEvent<HTMLFormElement>) => void;
    title : string;
    route?: () => void;
}

//그룹 멤버 컴포넌트와 그룹 이름을 공통적으로 사용되는 컴포넌트
const CenteredOverlayForm = ({children, title, handleSubmit, validated, route} : CenteredOverlayFormProps) => {
    return (
        <StyledCenteralizedContainer>
            <OverlayWrapper>
                <Container>
                    {/*noValidate 웹 폼의 유효성 검사(validations)를 비활성화하는 역할 */}
                    <Form noValidate onSubmit={handleSubmit} validated={validated}>
                        <StyledCentralizedContent>
                            <Row className='align-items-start'>
                                <StyledTitle>{title}</StyledTitle>
                            </Row>
                            <Row className='align-items-center'>
                                {children}
                            </Row>
                            <Row className='align-items-end'>
                                {route ? <StyledSubmitdButton onClick={(event) => {event.preventDefault();route();}}>더치페이그룹 새로 만들기</StyledSubmitdButton> : <StyledSubmitdButton>저장</StyledSubmitdButton> }
                            </Row>
                        </StyledCentralizedContent>
                    </Form>
                </Container>
            </OverlayWrapper>
        </StyledCenteralizedContainer>
    )
}

const StyledCenteralizedContainer = styled(Container)`
    width: 50vw;
    min-height : 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding : 0px;
    gap : 10px;
`

const StyledTitle = styled.h2`
    text-align: center;
    overflow-wrap: break-word;
    word-break: keep-all;
    line-height : 35px;
    font-weight: 700;
    
`

const StyledCentralizedContent = styled(Row)`
    display: flex;
    height: 60vh;
    align-items: center;
    justify-content: center;
`

const StyledSubmitdButton = styled(Button).attrs({
    type : 'submit'
})`
    display : flex;
    align-items : center;
    justify-content: center;
    margin-top: 3vh;
    padding : 15px;
    display: flex;
    background-color: #6610F2;
    outline: none;
    border: none;
    border-radius: 8px;
    &:hover {
        background-color: #6610F2;
        opacity: 0.8;
        /* filter : brightness(90%); */
    }
`

export default CenteredOverlayForm
