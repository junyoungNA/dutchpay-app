import { ButtonGroup, Container } from 'react-bootstrap'
import styled from 'styled-components'
import {groupMemberState} from '../state/groupMembers';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { groupNameState } from '../state/groupName';
import { useRouter } from '../hooks/useRouter';
import { ROUTES } from '../route/routes';
import { IUserGroups } from './Dutchpay';
import { kakaoUser } from '../state/kakaoUser';
import { deleteGroups } from '../util/api/api';
import { useEffect, useState } from 'react';


interface IExsitingGroupsProps {
    userGroups : IUserGroups[]
}

const ExsitingGroups: React.FC<IExsitingGroupsProps> = ({userGroups}) => {
    const setGroupMembers = useSetRecoilState(groupMemberState);
    const setGroupName = useSetRecoilState(groupNameState);
    const {idUser} = useRecoilValue(kakaoUser);
    const {routeTo} = useRouter();
    const [groups, setGroups] = useState<IUserGroups[]>([]);

    useEffect(() => {
        setGroups(userGroups);
    },[userGroups]);

    const userExpenseNavgiation  = (groupName : string, groupMembers : string[]) => {
        setGroupMembers(groupMembers);
        setGroupName(groupName);
        routeTo(ROUTES.EXPENSE_MAIN);
    }

    const deleteGroupsHandler = async (idUser : string , groupName : string) => {
        try {
            if(window.confirm('해당 그룹을 삭제하시겠습니까?') === false) return;
            const  result: any = await deleteGroups(idUser, groupName);
            setGroups(result);
            alert(`${groupName} 그룹을 삭제하였습니다.`);
            console.log(result, '존재하는 그룹');
        } catch (error : any) {
            console.log(error,'에러 발생');
        }
    };

    return (
        <StyledGroupContainer>
            {groups.map(({_id, groupName, groupMembers}) => 
                <StyledGroupDiv key={_id}>
                    <span style={{fontSize:"22px"}}>{groupName}</span>
                    <ButtonGroup >
                        <StyledGroupBtn onClick={() => userExpenseNavgiation(groupName, groupMembers)}>보기</StyledGroupBtn>
                        <StyledGroupBtn  type="button" onClick={(event) => {deleteGroupsHandler(idUser, groupName); event.stopPropagation();} }>삭제</StyledGroupBtn>
                    </ButtonGroup>
                </StyledGroupDiv>
            )}
        </StyledGroupContainer>
    )
}

export default ExsitingGroups

const StyledGroupContainer = styled(Container) `
    height: 400px;
    overflow: auto;

`
const StyledGroupDiv = styled.div`
        font-size: 18px;
        font-weight: 600;
        margin: 15px;
        display: flex;

        justify-content: space-evenly;
`

export const StyledGroupBtn = styled.button`
    border: none;
    background-color: #8f4fb4;
    color: #fff1f1;
    margin-right:10px;
    border-radius:10px;
    &:hover {
        opacity: 0.8;
    }
`