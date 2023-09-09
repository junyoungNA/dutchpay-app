import React from 'react'
import { Container, Row } from 'react-bootstrap'
import styled from 'styled-components'

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
    return (
        <StyledGroupContainer>
            <h5>{nickname} 속한 그룹 목록!</h5>
            {userGroups.map(({groupName}) => 
                <div>{groupName}</div>
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
