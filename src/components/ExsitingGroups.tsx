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

interface IExsitingGroupsProps {
    userGroups : IUserGroups[]
}

const ExsitingGroups: React.FC<IExsitingGroupsProps> = ({userGroups}) => {
    const setGroupMembers = useSetRecoilState(groupMemberState);
    const setGroupName = useSetRecoilState(groupNameState);
    const {idUser} = useRecoilValue(kakaoUser);
    const {routeTo} = useRouter();

    const userExpenseNavgiation  = (groupName : string, groupMembers : string[]) => {
        setGroupMembers(groupMembers);
        setGroupName(groupName);
        routeTo(ROUTES.EXPENSE_MAIN);
    }

    const deleteGroupsHandler = async (idUser : string , groupName : string) => {
        try {
            const  result: any = await deleteGroups(idUser, groupName);
            console.log(result, '존재하는 그룹');
        } catch (error : any) {
            console.log(error,'에러 발생');
        }
    };

    return (
        <StyledGroupContainer>
            {userGroups.map(({groupName, groupMembers}) => 
                <StyledGroupDiv key={groupName}>
                    <span >{groupName}</span>
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

const StyledGroupBtn = styled.button`
    border: none;
    background-color: #8f4fb4;
    color: #fff1f1;
    margin-right:10px;
    border-radius:10px;
    &:hover {
        opacity: 0.8;
    }
`