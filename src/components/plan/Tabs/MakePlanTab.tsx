import React, { ChangeEvent } from 'react'
import { FormGroup, Form, Button } from 'react-bootstrap'
import styled from 'styled-components'
import { StyledDirectionBtn } from '../PlanMap'
import { TbTilde } from 'react-icons/tb'
import { ArrowRight } from 'react-bootstrap-icons'
import { postData } from '../../../util/api/apiInstance'
import { useRecoilValue } from 'recoil'
import { mapArrive } from '../../../atom/mapArrive'
import { mapDeparture } from '../../../atom/mapDeparture'

export interface IMakePlanTabProps {
    setKeyword : (value : string) => void,
    handleTabSelect : (type : string) => void, 
}

const MakePlanTab:React.FC<IMakePlanTabProps> = ({setKeyword, handleTabSelect}) => {
    const arrive = useRecoilValue(mapArrive);
    const departure = useRecoilValue(mapDeparture);

    const hanldeSubmit =  async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const planPayload = {
            title: formData.get('title') as string,
            date: formData.get('date') as string,
            departure: formData.get('departure') as string,
            arrive: formData.get('arrive') as string,
            startTime: formData.get('startTime') as string,
            endTime: formData.get('endTime') as string,
            content: formData.get('content') as string,
        }
        // console.log(planPayload,'palnpayload');
        const result : any  =  await postData('plan',planPayload );
        // console.log(result,'결과');
    }
    return (
        <Form onSubmit={hanldeSubmit}>
            <StyledFormControl
                type="text"
                onChange={(e : ChangeEvent<HTMLInputElement>) => setKeyword(e.target.value)}
                placeholder='이 계획의 제목을 입력해주세요!'
                minLength={1}
                name='title'
                maxLength={20}
            />
            <StyledFormControl
                type='date'
                placeholder='계획의 날짜를 선택해 주세요.'
                name='date'
                // onChange={(e) => setDate(e.target.value)}
            />
            <StyledFormGroup>
                <StyledFormControl
                    type='text'
                    placeholder='출발지'
                    name='departure'
                    defaultValue={departure}
                />
                <StyledIcon>
                    <ArrowRight/>
                </StyledIcon>
                <StyledFormControl
                    type='text'
                    placeholder='도착지'
                    name='arrive'
                    defaultValue={arrive}
                />
                <StyledDirectionBtn onClick={() => handleTabSelect('record')} width='100%'>길찾기 기록</StyledDirectionBtn>
            </StyledFormGroup>
            <StyledFormGroup>
                <StyledFormControl
                    type='time'
                    name='startTime'
                />
                <StyledIcon>
                    <TbTilde/>
                </StyledIcon>
                <StyledFormControl
                    type='time'
                    name='endTime'
                />
            </StyledFormGroup>
            <StyledFormControl
                    as='textarea'
                    name='content'
                    placeholder='내용을 입력해주세요 (20자 이내).'
                    maxLength={20}
                    minLength={1}
                    width='100%'
                    height='15vh'
                    row={100}
            />
            <Button type='submit'>저장하기</Button>
        </Form>
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