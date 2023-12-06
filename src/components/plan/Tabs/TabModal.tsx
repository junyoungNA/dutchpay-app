import { Button, Modal,Form } from 'react-bootstrap';
import { useState } from 'react';
import { StyledDirectionBtn } from '../PlanMap';
import PlanForm from './PlanForm';
import showAlert from '../../../util/shoAlert';
import { useRecoilValue } from 'recoil';
import { kakaoUser } from '../../../atom/kakaoUser';
import useFetchUserInfo from '../../../hooks/useFetchUserInfo ';
import useMakePlanForm from '../../../hooks/usePlanForm';
import { TPlan } from '../../../atom/planRecord';

interface ITabModalProps {
    plan : TPlan
}

const TabModal = ({plan} : ITabModalProps ) => {
    const {idUser} = useRecoilValue(kakaoUser);
    const fetchUserInfo = useFetchUserInfo();

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const {formStates, onFormChange, onReset, checkTitleAndDateValidated, isTitleValid, isDateValid} = useMakePlanForm({plan})

    const {title, date, startTime, endTime, content, departure, arrive } = formStates; 
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
            if(error) return;
            // const {msg} : any  =  await postData('plan', planPayload);
            // if(msg === '계획 생성 성공') {
            //     showAlert(`${planPayload.title} 계획만들기 성공!. 계획 탭에서 확인하세요.`);
            //     onReset();
            // }
        }catch(error) {
            console.log(error);
            showAlert('계획 수정 오류');
        }
    }

    return (
        <>
            <StyledDirectionBtn variant="primary" onClick={handleShow}>
                자세히
            </StyledDirectionBtn>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
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
                    <Button variant="secondary" onClick={handleClose}>
                    닫기    
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default TabModal
