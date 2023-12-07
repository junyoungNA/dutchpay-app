import { Form, FormGroup } from 'react-bootstrap'
import OverlayForm from '../../shared/Form/OverlayForm'
import styled from 'styled-components'
import { StyledDirectionBtn } from '../PlanMap'
import { TbTilde } from 'react-icons/tb'
import { ArrowRight } from 'react-bootstrap-icons'
import { ChangeEvent, FormEvent } from 'react'
import { TmakePlanFormStates } from '../../../hooks/usePlanForm'

interface IPlanFormProps {
    handleSubmit: (e : FormEvent<HTMLFormElement>) => void,
    formStates: TmakePlanFormStates,
    onFormChange : (e : ChangeEvent<HTMLInputElement>) => void,
    isDateValid : boolean,
    isTitleValid : boolean,
    handleTabSelect?: (type : string) => void,
}

const PlanForm = ({
    handleSubmit, 
    formStates, 
    onFormChange, 
    isDateValid, 
    isTitleValid,
    handleTabSelect
}:IPlanFormProps) => {
    
    const {title, date, startTime, endTime, content, departure, arrive } = formStates; 
    return (
        <OverlayForm handleSubmit={handleSubmit}>
            <Form.Group>
                <StyledFormControl
                    type="text"
                    onChange={onFormChange}
                    placeholder='이 계획의 제목을 입력해주세요.(20자 이내)'
                    minLength={1}
                    isValid={isTitleValid}
                    isInvalid={!isTitleValid}
                    name='title'
                    maxLength={20}
                    value={title}
                />
                <Form.Control.Feedback type="invalid" data-valid={isTitleValid}>제목을 입력해주세요.</Form.Control.Feedback>
            </Form.Group>
            
            <Form.Group>
                <StyledFormControl
                    type='date'
                    placeholder='계획의 날짜를 선택해 주세요.'
                    onChange={onFormChange}
                    value={date}
                    isValid={isDateValid}
                    isInvalid={!isDateValid}
                    name='date'
                />
                <Form.Control.Feedback type="invalid" data-valid={isDateValid}>해당 날짜를 입력해주세요.</Form.Control.Feedback>
            </Form.Group>

            <StyledFormGroup>
                <StyledFormControl
                    type='text'
                    placeholder='출발지'
                    name='departure'
                    value={departure}
                    maxLength={25}
                    onChange={onFormChange}
                />
                <StyledIcon>
                    <ArrowRight/>
                </StyledIcon>
                <StyledFormControl
                    type='text'
                    placeholder='도착지'
                    name='arrive'
                    value={arrive}
                    maxLength={25}
                    onChange={onFormChange}
                />
                {handleTabSelect && <StyledDirectionBtn onClick={() => handleTabSelect('directionRecord')} width='100%'>길찾기 기록</StyledDirectionBtn>}
            </StyledFormGroup>

            <StyledFormGroup>
                <StyledFormControl
                    type='time'
                    name='startTime'
                    onChange={onFormChange}
                    value={startTime}
                />
                <StyledIcon>
                    <TbTilde/>
                </StyledIcon>
                <StyledFormControl
                    type='time'
                    name='endTime'
                    onChange={onFormChange}
                    value={endTime}
                />
            </StyledFormGroup>
            <StyledFormControl
                    as='textarea'
                    name='content'
                    placeholder='내용을 입력해주세요 (100자 이내).'
                    maxLength={100}
                    minLength={1}
                    width='100%'
                    height='15vh'
                    row={100}
                    onChange={onFormChange}
                    value={content}
            />
        </OverlayForm>
    )
}

const StyledFormGroup = styled(FormGroup)`
    display:flex;
    align-items:center; 
    gap:10px;
`
const StyledFormControl = styled(Form.Control)<{width?: string, marginRight?: string, height?:string,}>`
    width : ${({width}) => width};
    margin-top : 10px;
    resize: none;
    height: ${({height}) => height};
`

const StyledIcon = styled.div`
    font-size: 20px;
    margin: 6px 5px 0 5px;
`;

export default PlanForm
