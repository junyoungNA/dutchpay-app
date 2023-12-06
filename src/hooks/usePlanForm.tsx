import { ChangeEvent, useEffect, useState } from 'react'
import { TPlan } from '../atom/planRecord';

export type TmakePlanFormStates = {
    title: string;
    date: string;
    startTime: string;
    endTime: string;
    content: string;
    departure: string;
    arrive: string;
    _id?: string,
};

export interface IUsePlanFormProps {
    plan? : TPlan
    arriveRecord? : string,
    departureRecord? : string,
}

// 커스텀훅에서 받는 매개변수는 props가 아니다
// 길찾기기록에서 설정을 통해 출발지, 도착지 정보를 계획만들기 작성탭으로 가져와야함
// 모달창에서도 계획 자세히보기 버튼을 클릭시 해당 정보를 가지고 와야함
//어떻게?
//1. atom을 사용해서 길찾기기록에서, 모달창에서 가져오기전 setState를 통해 여기서 atom에 접근한다.
// 2. useEffect에서 조건문을 통해 plan이 들어왔다면과 arrive,departure과 들어왔다면 조건문을 통해 동작한다.
// 2번을 채택하여 구현하기로 함!
const usePlanForm = ({plan, arriveRecord, departureRecord} : IUsePlanFormProps) => {
    const [isTitleValid, setTitleValid] = useState(false);
    const [isDateValid, setDateValid] = useState(false);
    const [formStates, setFormStates] = useState<TmakePlanFormStates>({
        title:'',
        date:'',
        startTime:'',
        endTime:'',
        content:'',
        departure: '',
        arrive: '',
        _id:'',
    });

    const onFormChange = (e : ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target; // 우선 e.target 에서 name 과 value 를 추출
        switch(name) {
            case 'title': 
                value.length > 0 ? setTitleValid(true) : setTitleValid(false);
                break;
            case 'date': 
                value !== (null || '') ? setDateValid(true) : setDateValid(false);
                break;
            default : break;
        }
        setFormStates({
            ...formStates, 
            [name]: value 
        });
    }

    const onReset = () => {
        setFormStates({
            title:'',
            date:'',
            startTime:'',
            endTime:'',
            content:'',
            departure:'',
            arrive:'',
            _id:'',
        })
    };

    const checkTitleAndDateValidated = (title : string, date : string) => {
        const titleValid = title.length > 0;
        const dateValid = date!== (null || '');
        setTitleValid(titleValid);
        setDateValid(dateValid);
        return titleValid && dateValid
    }

    // MakePlanTab 컴포넌트가 처음에 마운트되면서 
    // departure와 arrive 값이 변경되지 않을 것으로 예상된다면, 
    // 초기 상태를 직접 설정하는 방식도 사용할 수 있습니다(state 선언시 인자로 넣기)
    // useState에서 초기값을 바로 설정하면 동작하지 않음?
    useEffect(() => {
         // arrive와 departure 이 인자로 들어올때
        if (arriveRecord !== undefined && departureRecord !== undefined) {
                setFormStates((prevForm) => ({
                ...prevForm,
                departure: arriveRecord,
                arrive: departureRecord,
            }));
        }

        // plan 이 인자로 들어올때
    if (plan !== undefined) {
            setFormStates((prevForm) => ({
                ...prevForm,
                ...plan
            }));
            checkTitleAndDateValidated(plan.title, plan.date);
        }
    }, [arriveRecord, departureRecord, plan]);

    return {formStates, onFormChange, onReset, checkTitleAndDateValidated, isTitleValid, isDateValid}
}

export default usePlanForm
