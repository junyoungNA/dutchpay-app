import { Button, Modal, } from 'react-bootstrap';
import { useState } from 'react';
import { StyledDirectionBtn } from '../PlanMap';
import PlanForm from './PlanForm';
import showAlert from '../../../util/shoAlert';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { kakaoUser } from '../../../atom/kakaoUser';
import useFetchUserInfo from '../../../hooks/useFetchUserInfo ';
import useMakePlanForm from '../../../hooks/usePlanForm';
import { TPlan, planRecord } from '../../../atom/planRecord';
import { deleteData, putData } from '../../../util/api/apiInstance';
import { APIResponse } from '../../../../type/commonResponse';
import { planDateAtom } from '../../../atom/planDateSet';

type TPutPlanResponse = {
    updatedPlan : TPlan,
}

interface ITabModalProps {
    plan : TPlan
}

const TabModal = ({plan} : ITabModalProps ) => {
    const {idUser} = useRecoilValue(kakaoUser);
    const fetchUserInfo = useFetchUserInfo();
    const [plans, setPlans] = useRecoilState(planRecord);
    const setPlanDate = useSetRecoilState(planDateAtom);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const {formStates, onFormChange, onReset, checkTitleAndDateValidated, isTitleValid, isDateValid} = useMakePlanForm({plan})

    const {title, date, startTime, endTime, content, departure, arrive, _id } = formStates; 
    
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        try {
            event.preventDefault();
            if(!checkTitleAndDateValidated(title, date)) return;
            const planPayload = {
                title: title,
                date: date,
                departure: departure,
                arrive: arrive, 
                startTime:startTime,
                endTime: endTime,
                content: content,
                idUser : idUser,
            }
             // user token체크후 유효성검사 실패 시 메인페이지로 이동
            const {error} = await fetchUserInfo();
            if(error) return; //fetchUserInfo에서 route처리

            const response : APIResponse<TPutPlanResponse> = await putData(`plan/${_id}`, planPayload);
            if(response.message === '계획 수정 성공' && response.result?.updatedPlan) {
                //수정이 완료되었다면 해당 계획의 날짜가 바뀌었다면 날짜를 바꿔서 새롭게 
                // 해당날짜의 planRecord 정보들을 가져와야한다.
                // 날짜가 바뀌지않았다면 planRecord 바뀐 계획 게시물의 정보만 찾아
                //바뀐 계획으로 바꿔줌!
                const updatePlanIDX = plans.findIndex((item) => item._id === _id);
                const updatePlans = [...plans];
                if(date !== plans[updatePlanIDX].date) {
                    // setPlanDate 만 해주면 PlanRecordTab에서 바뀐 값을 인지해서
                    // 새롭게 데이터들을 가져옴(업데이트 된 게시물 포함)
                    setPlanDate(date);
                } else {
                    updatePlans[updatePlanIDX] = response.result?.updatedPlan;
                    // console.log(updatePlans,'바뀐 plans',updatePlanIDX);
                    setPlans(updatePlans);
                }
                return showAlert(`${planPayload.title} 계획을 수정하였습니다.`);
            }
            return showAlert(`계획 수정 오류,${response?.message}`)

        }catch(error) {
            console.log(error);
            showAlert('계획 수정 오류');
        }
    }

    const onDeletePlanHandle = async() =>  {
        try {
              // user token체크후 유효성검사 실패 시 메인페이지로 이동
            const {error} = await fetchUserInfo();
            if(error) return; //fetchUserInfo에서 route처리
            if(!window.confirm('해당 계획을 삭제하시겠습니까?')) return;
                const response  = await deleteData(`plan/${_id}`);
                console.log(response,'삭제 결과');
                if(response.message === '계획 삭제 성공') {
                    const updatedPlan = plans.filter((item) => _id !== item._id);
                    setPlans(updatedPlan);
                    await handleClose();
                    return showAlert(`${title} 계획을 삭제하였습니다.`);
                }
                return showAlert(`계획 수정 오류,${response?.message}`)
        } catch(error) {
            console.log(error)
            showAlert('계획 삭제 오류');
        }
    }

    return (
        <>
            <StyledDirectionBtn variant="primary" onClick={handleShow}>
                자세히
            </StyledDirectionBtn>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>MY Plan</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <PlanForm 
                            handleSubmit={handleSubmit}
                            formStates={formStates}
                            onFormChange={onFormChange}
                            isDateValid={isDateValid}
                            isTitleValid={isTitleValid}
                        />
                </Modal.Body>
                <Modal.Footer>
                <Button variant="danger" onClick={onDeletePlanHandle}>
                        삭제    
                    </Button>
                    <Button variant="secondary" onClick={handleClose}>
                        닫기    
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default TabModal
