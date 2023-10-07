import React, { ChangeEvent } from 'react'
import { FormGroup, Form, Button } from 'react-bootstrap'
import styled from 'styled-components'
import { StyledDirectionBtn } from '../../PlanMap'
import { TbTilde } from 'react-icons/tb'
import { ArrowRight } from 'react-bootstrap-icons'

export interface IMakePlanTabProps {
    departure : string,
    arrive : string,
    setKeyword : (value : string) => void,
    handleTabSelect : (type : string) => void, 
}

const MakePlanTab:React.FC<IMakePlanTabProps> = ({departure, arrive, setKeyword, handleTabSelect}) => {
    return (
        <>
            <StyledFormControl
                type="text"
                onChange={(e : ChangeEvent<HTMLInputElement>) => setKeyword(e.target.value)}
                placeholder='이 계획의 제목을 입력해주세요!'
                minLength={1}
                maxLength={20}
            />
            <StyledFormControl
                type='date'
                placeholder='계획의 날짜를 선택해 주세요.'
                // onChange={(e) => setDate(e.target.value)}
            />
            <StyledFormGroup>
                <StyledFormControl
                    type='text'
                    placeholder='출발지'
                    defaultValue={departure}
                />
                <StyledIcon>
                    <ArrowRight/>
                </StyledIcon>
                <StyledFormControl
                    type='text'
                    placeholder='도착지'
                    defaultValue={arrive}
                />
                <StyledDirectionBtn onClick={() => handleTabSelect('record')} width='100%'>길찾기 기록</StyledDirectionBtn>
            </StyledFormGroup>
            <StyledFormGroup>
                <StyledFormControl
                    type='time'
                />
                <StyledIcon>
                    <TbTilde/>
                </StyledIcon>
                <StyledFormControl
                    type='time'
                />
            </StyledFormGroup>
            <StyledFormControl
                    as='textarea'
                    placeholder='내용을 입력해주세요 (20자 이내).'
                    maxLength={20}
                    minLength={1}
                    width='100%'
                    height='15vh'
                    row={100}
            />
            <Button>저장하기</Button>
        </>
    )
}

export default MakePlanTab

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