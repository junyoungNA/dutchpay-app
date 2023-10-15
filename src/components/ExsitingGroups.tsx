import { Container } from 'react-bootstrap'
import styled from 'styled-components'
import {groupMemberState} from '../state/groupMembers';
import { useSetRecoilState } from 'recoil';
import { groupNameState } from '../state/groupName';
import { useRouter } from '../hooks/useRouter';
import { ROUTES } from '../route/routes';

interface IUserGrooups {
    _id: string,
    groupName : string,
    groupMembers : string[],
    idUser : string,
    __v : number
}

interface IExsitingGroupsProps {
    userGroups : IUserGrooups[]
    nickname: string
}

const ExsitingGroups= ({userGroups, nickname} : IExsitingGroupsProps) => {
    const setGroupMembers = useSetRecoilState(groupMemberState);
    const setGroupName = useSetRecoilState(groupNameState);
    const {routeTo} = useRouter();

    const userExpenseNavgiation  = (groupName : string, groupMembers : string[]) => {
        setGroupMembers(groupMembers);
        setGroupName(groupName);
        routeTo(ROUTES.EXPENSE_MAIN);
    }

    return (
        <StyledGroupContainer>
            <h5>{nickname} 속한 그룹 목록!</h5>
            {userGroups.map(({groupName, groupMembers}) => 
                <div key={groupName}>
                    <span >{groupName}</span>
                    <button onClick={() => userExpenseNavgiation(groupName, groupMembers)}>보기</button>
                </div>
            )}
        </StyledGroupContainer>
    )
}

export default ExsitingGroups

const StyledGroupContainer = styled(Container) `
    & div {
        font-size: 16px;
        font-weight: 500;
        margin: 15px;
    }
`
