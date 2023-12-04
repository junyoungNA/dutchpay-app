import React, { ChangeEvent, useEffect, useState } from 'react'
import { FormGroup, Form, Button } from 'react-bootstrap'
import styled from 'styled-components'
import { StyledDirectionBtn } from '../PlanMap'
import { TbTilde } from 'react-icons/tb'
import { ArrowRight } from 'react-bootstrap-icons'
import { postData } from '../../../util/api/apiInstance'
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil'
import { mapArrive } from '../../../atom/mapArrive'
import { mapDeparture } from '../../../atom/mapDeparture'
import { kakaoUser } from '../../../atom/kakaoUser'
import { useRouter } from '../../../hooks/useRouter'
import useFetchUserInfo from '../../../hooks/useFetchUserInfo '
import showAlert from '../../../util/shoAlert'
import { planDateAtom } from '../../../atom/planDateSet'

export interface IMakePlanTabProps {
    handleTabSelect : (type : string) => void, 
}

const MakePlanTab:React.FC<IMakePlanTabProps> = ({handleTabSelect}) => {
    const arrive = useRecoilValue(mapArrive);
    const departure = useRecoilValue(mapDeparture);
    const {idUser} = useRecoilValue(kakaoUser);
    const {routeTo} = useRouter();
    const resetKakaoUser = useResetRecoilState(kakaoUser);
    const fetchUserInfo = useFetchUserInfo({ resetKakaoUser, routeTo });

    const setPlanDate = useSetRecoilState(planDateAtom); //현재 만들어진 계획이 있다면 이 날짜를 이용해 만든 계획 보여주기
    const [isTitleValid, setTitleValid] = useState(false);
    const [isDateValid, setDateValid] = useState(false);
    
    // MakePlanTab 컴포넌트가 처음에 마운트되면서 
    // departure와 arrive 값이 변경되지 않을 것으로 예상된다면, 
    // 초기 상태를 직접 설정하는 방식도 사용할 수 있습니다
    // useState에서 초기값을 바로 설정하면 동작하지 않음?
    useEffect(() => {
        setForm((prevForm) => ({
            ...prevForm,
            formDeparture: departure,
            formArrive: arrive,
        }));
    }, [departure, arrive]);

    const [form, setForm] = useState({
        title:'',
        date:'',
        startTime:'',
        endTime:'',
        content:'',
        formDeparture: '',
        formArrive: '',
    })

    const onFormChagne = (e : ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target; // 우선 e.target 에서 name 과 value 를 추출
        setForm({
            ...form, 
            [name]: value 
        });
    }

    const onReset = () => {
        setForm({
            title:'',
            date:'',
            startTime:'',
            endTime:'',
            content:'',
            formDeparture:'',
            formArrive:'',
        })
    };
    

    const {title, date, startTime, endTime, content, formDeparture, formArrive } = form; 


    const hanldeSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        try {
            event.preventDefault();
            if(!checkFormValidated()) return;
            const planPayload = {
                title: title,
                date: date,
                departure: formDeparture,
                arrive: formArrive, 
                startTime:startTime,
                endTime: endTime,
                content: content,
                idUser : idUser,
            }
            onReset();
             // user token체크후 유효성검사 실패 시 메인페이지로 이동
            await fetchUserInfo();
            const result : any  =  await postData('plan', planPayload);
            showAlert(`${planPayload.title} 계획만들기 성공!. 계획 탭에서 확인하세요.`);
            setPlanDate(date);
            handleTabSelect('planRecord');
        }catch(error) {
            console.log(error,'계획 생성 오류');
        }
    }

    const checkFormValidated = () => {
        const titleValid = title.length > 0;
        const dateValid = date!== (null || '');
        setTitleValid(titleValid);
        setDateValid(dateValid);
        return titleValid && dateValid
    }

    return (
        <Form  onSubmit={hanldeSubmit}>
            <Form.Group>
                <StyledFormControl
                    type="text"
                    onChange={onFormChagne}
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
                    onChange={onFormChagne}
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
                    name='formDeparture'
                    value={formDeparture}
                    maxLength={25}
                    onChange={onFormChagne}
                />
                <StyledIcon>
                    <ArrowRight/>
                </StyledIcon>
                <StyledFormControl
                    type='text'
                    placeholder='도착지'
                    name='formArrive'
                    value={formArrive}
                    maxLength={25}
                    onChange={onFormChagne}
                />
                <StyledDirectionBtn onClick={() => handleTabSelect('directionRecord')} width='100%'>길찾기 기록</StyledDirectionBtn>
            </StyledFormGroup>
            <StyledFormGroup>
                <StyledFormControl
                    type='time'
                    name='startTime'
                    onChange={onFormChagne}
                    value={startTime}
                />
                <StyledIcon>
                    <TbTilde/>
                </StyledIcon>
                <StyledFormControl
                    type='time'
                    name='endTime'
                    onChange={onFormChagne}
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
                    onChange={onFormChagne}
                    value={content}
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