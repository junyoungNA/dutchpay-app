import { StyledSearchListItem } from '../PlanMap'
import { Form, ListGroup } from 'react-bootstrap'
import Lottie from 'lottie-react';
import { error_animation } from '../../../aseets';
import useFetchGetUsersPlan from '../../../hooks/useFetchUserPlan';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { planRecord } from '../../../atom/planRecord';
import handleAsyncOperation from '../../../util/handleAsyncOperation';
import { StyledErrorMessage } from '../../dutchpay/AddMembers';
import RecordListItem from './PlanRecordListItem';
import getCalenderDate from '../../../util/getCurrentDate';

const PlanRecordTab = () => {
    const [userPlansRecord, setUserPlansRecord] = useRecoilState(planRecord); 
    const getUsersPlanRecordFetch = useFetchGetUsersPlan();
    const [date, setDate] = useState(getCalenderDate()); //날짜로 계획표시

    useEffect(() => {
        handleAsyncOperation(getUsersPlanRecordFetch(date), setUserPlansRecord);
    },[date,getUsersPlanRecordFetch,setUserPlansRecord ])

    return (
        <>
            <Form.Control   
                type='date'
                placeholder='날짜를 선택해 주세요.'
                onChange={(e) => {setDate(e.target.value); console.log(e.target.value)}}
                value={date}
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
