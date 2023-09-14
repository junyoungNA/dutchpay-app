import CenteredOverlayForm from './CenteredOverlayForm'
import {useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState} from 'recoil';
import { groupMemberState } from '../state/groupMembers';
import { InputTags } from 'react-bootstrap-tagsinput';
import React, { useEffect, useState } from 'react';
import { groupNameState } from '../state/groupName';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../route/routes';
import { kakaoUser } from '../state/kakaoUser';
import { postData } from '../util/api/apiInstance';
import { memberIdState } from '../state/memberId';
import getCalenderDate from '../util/getCurrentDate';

//멤버 추가 컴포넌트
const AddMembers = () => {
    
    const navigate = useNavigate();
    const [groupMembers,setGroupMembers] = useRecoilState(groupMemberState);
    const userInfo = useRecoilValue(kakaoUser);
    const setMemberId = useSetRecoilState(memberIdState);
    const resetMembers = useResetRecoilState(groupMemberState)
    
    const groupName = useRecoilValue(groupNameState);
    const [validated, setValidated] = useState(false); 

    //inputTages 이름을 추가하지 않을시 에러메세지를 위한 state
    const handleSubmit = async (event : React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try { 
            setValidated(true);
            const createdAt = getCalenderDate() ; //오늘날짜 yyyy-mm-dd
            const result : any = await postData('members',{idUser :userInfo.idUser, groupMembers, groupName, createdAt});
            setMemberId(result._id);
            if(groupMembers.length > 0) {
                navigate(ROUTES.EXPENSE_MAIN); 
            } 
        } catch (error : any) {
            console.log(error);
        }
    }
    const header = `${groupName}의 속한 멤버들의 이름을 넣어주세요`;

    useEffect(() => {
        resetMembers();
    });

    return (
        <CenteredOverlayForm
            title={header}
            handleSubmit={handleSubmit}     
            validated={validated}       
        >   
            {/* noValidate 웹 폼의 유효성 검사(validations)를 비활성화하는 역할 
             react-bootstrap제공 tag컴포넌트 태그를 제공* */}
            <InputTags   
                placeholder='이름 간 띄어 쓰기를 해주세요'
                onTags={(value : any) => {setGroupMembers(value.values)}}
                data-testid="input-member-names"
                values={groupMembers}
                // style={{border : !validated ? '2px solid red' : '1px solid gray'}}
            />
            {validated && groupMembers.length === 0 &&<StyledErrorMessage>그룹 멤버들의 이름을 입력해주세요.</StyledErrorMessage>}
        </CenteredOverlayForm>
    )
}

export default (AddMembers)

export const StyledErrorMessage = styled.span`
    margin-top: 10px;
    color: #db2f2f;
    font-size: 20px;
`
