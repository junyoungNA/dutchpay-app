import {  Form, } from 'react-bootstrap'
import CenteredOverlayForm from './CenteredOverlayForm'
import {groupNameState} from '../state/groupName';
import {useRecoilValue, useRecoilState} from 'recoil';
import { useState } from 'react';
import { kakaoUser } from '../state/kakaoUser';
import  {getExsitingGroup} from '../util/api/api'
import { StyledErrorMessage } from './AddMembers';
import { useRouter } from '../hooks/useRouter';


//그룹의 이름 정하는 컴포넌트
const CreateGroup = () => {
    const {routeTo} = useRouter();
    const {idUser} = useRecoilValue(kakaoUser);

    //bootstrap에서 지원해주는 form 태그안에 input 요소들의
    // text 검사를 다 돌았는지 확인해주는 역할 required 등
    const [validated, setValidated] = useState(false); 
    const [vaildGroupName, setVaildGroupName] = useState(false); 
    const [groupName, setGroupName] = useRecoilState(groupNameState);
    const [isExsitingGroup, setExsitingGroup] = useState(false);

    const fetchData = async (idUser : string, groupName : string) => {
        try {
            const exsitingGroup: any = await getExsitingGroup(idUser, groupName);
            console.log(exsitingGroup, '존재하는 그룹 클라이언트');
            return exsitingGroup;
        } catch (error : any) {
            if(error.message === 'Error: Request failed with status code 400') {
                setExsitingGroup(true); //이미 존재하는 그룹;
            } else {
                setExsitingGroup(false);
            }
        }
    };

    const handleSubmit = async (event : React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;
        const exsitingGroup = await fetchData(idUser, groupName);
        console.log(exsitingGroup);
        if(!exsitingGroup) {
            setExsitingGroup(true);
            return
        }; //존재하는 그룹시? 또는 에러시
        setExsitingGroup(false);;
        if(form.checkValidity()) {
            setVaildGroupName(true);
            routeTo('/members');
        } else {
            event.stopPropagation();
            setVaildGroupName(false)
        }
        setValidated(true);
    }

    return (
        <CenteredOverlayForm    
            title='먼저, 더치 페이 할 그룹의 이름을 정해주세요'
            handleSubmit={handleSubmit}
            validated={validated}
            > 
            <Form.Group controlId='validationGroupName'>
                <Form.Control   
                    type='text' 
                    required
                    maxLength={10}
                    placeholder='2022 제주도 여행(10자 이내)'
                    onChange={(e) => {setGroupName(e.target.value.trim());}}
                    style={{border : !validated ?'1px solid red' : '1px solid gray'}}
                    />
                <Form.Control.Feedback type="invalid" data-validate={vaildGroupName} >
                    {/* DOM에 항상 렌더링 됨!? 리액트 부트스트랩 특성상 */}
                    그룹 이름을 입력해 주세요 .
                </Form.Control.Feedback>
                {isExsitingGroup && <StyledErrorMessage>이미 존재하는 그룹 이름입니다.</StyledErrorMessage>}
            </Form.Group>
        </CenteredOverlayForm>
    )
}

export default  CreateGroup
