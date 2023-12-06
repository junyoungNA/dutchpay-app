import { ChangeEvent, useEffect, useState } from 'react'

export type TmakePlanFormStates = {
    title: string;
    date: string;
    startTime: string;
    endTime: string;
    content: string;
    formDeparture: string;
    formArrive: string;
};

interface IUseMkaePlanFormProps {
    departure : string,
    arrive : string,
}


// 커스텀훅에서 받는 매개변수는 props가 아니다
const useMakePlanForm = ({departure, arrive} : IUseMkaePlanFormProps) => {
    const [isTitleValid, setTitleValid] = useState(false);
    const [isDateValid, setDateValid] = useState(false);
    const [formStates, setFormStates] = useState<TmakePlanFormStates>({
        title:'',
        date:'',
        startTime:'',
        endTime:'',
        content:'',
        formDeparture: '',
        formArrive: '',
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
            formDeparture:'',
            formArrive:'',
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
        setFormStates((prevForm) => ({
            ...prevForm,
            formDeparture: departure,
            formArrive: arrive,
        }));
    }, [departure, arrive]);

    return {formStates, onFormChange, onReset, checkTitleAndDateValidated, isTitleValid, isDateValid}
}

export default useMakePlanForm
