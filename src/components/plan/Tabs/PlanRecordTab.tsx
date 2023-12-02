import { IDirectionRecord, StyledSearchListItem } from '../PlanMap'
import { Form, ListGroup } from 'react-bootstrap'
import Lottie from 'lottie-react';
import { error_animation } from '../../../aseets';
import useFetchGetUsersPlan from '../../../hooks/useFetchUserPlan';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { planRecord } from '../../../atom/planRecord';
import handleAsyncOperation from '../../../util/handleAsyncOperation';
import { calendarDateState } from '../../../atom/calendarDate';
import { StyledErrorMessage } from '../../dutchpay/AddMembers';

const PlanRecordTab = () => {
    const [userPlansRecord, setUserPlansRecord] = useRecoilState(planRecord); 
    const getUsersPlanRecordFetch = useFetchGetUsersPlan();
    const {year, month} = useRecoilValue(calendarDateState);
    const customDate = `${year}-${month < 9 ? '0'+ (month + 1): month + 1}`; //yyyy-mm;
    
    useEffect(() => {
        handleAsyncOperation(getUsersPlanRecordFetch(customDate), setUserPlansRecord);
        console.log(userPlansRecord, customDate);
    },[])

    return (
        <>
            <Form.Control   
                type='date'
                placeholder='결제한 날짜를 선택해 주세요.'
                // onChange={(e) => setDate(e.target.value)}
                // value={date}
                />
            {userPlansRecord.length === 0 && <><StyledErrorMessage>계획 기록이 없어요ㅠ</StyledErrorMessage><Lottie animationData={error_animation}  loop={false}/></>}
            <ListGroup as='ol' numbered>
                {userPlansRecord?.map((item : any, idx: number) => 
                    <StyledSearchListItem action key={idx}>
                        {/* <DirectionRecordListItem onClickDirectionRecord={onClickDirectionRecord} arriveAndDeparture={arriveAndDeparture}/> */}
                    </StyledSearchListItem >
                )}
            </ListGroup>
        </>
    )
}

export default PlanRecordTab
