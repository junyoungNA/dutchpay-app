import { StyledSearchListItem } from '../PlanMap'
import { Form, ListGroup } from 'react-bootstrap'
import Lottie from 'lottie-react';
import { error_animation } from '../../../aseets';
import useFetchGetUsersPlan from '../../../hooks/useFetchUserPlan';
import { useEffect, useState } from 'react';
import { useRecoilState, } from 'recoil';
import { planRecord } from '../../../atom/planRecord';
import { StyledErrorMessage } from '../../dutchpay/AddMembers';
import RecordListItem from './PlanRecordListItem';
import { planDateAtom } from '../../../atom/planDateSet';

const PlanRecordTab = () => {
    const [planDate,setPlanDate] = useRecoilState(planDateAtom); //현재 만들어진 계획이 있다면 이 날짜를 이용해 만든 계획 보여주기
    const [userPlansRecord, setUserPlansRecord] = useRecoilState(planRecord); 
    const getUsersPlanRecordFetch = useFetchGetUsersPlan();
    // const [date, setDate] = useState(makedPlanDate || getCalenderDate()); //날짜로 계획표시
    useEffect(() => {
        const updateDateAndFetch = async () => {
                // 계획 작성 후 바로 만든 계획을 보여주기 위한 date 설정
                const result:any = await getUsersPlanRecordFetch(planDate);
                setUserPlansRecord(result);
        };
        updateDateAndFetch();
    },[planDate,getUsersPlanRecordFetch,setUserPlansRecord])

    return (
        <>
            <Form.Control   
                type='date'
                placeholder='날짜를 선택해 주세요.'
                onChange={(e) => {setPlanDate(e.target.value);}}
                value={planDate}
                />
            {userPlansRecord.length <= 0 && <><StyledErrorMessage>계획 기록이 없어요ㅠ</StyledErrorMessage><Lottie animationData={error_animation}  loop={false}/></>}
            <ListGroup as='ol' numbered>
                {userPlansRecord?.map((plan : any, idx: number) => 
                    <StyledSearchListItem action key={idx}>
                        <RecordListItem plan={plan}/>
                    </StyledSearchListItem >
                )}
            </ListGroup>
        </>
    )
}

export default PlanRecordTab
