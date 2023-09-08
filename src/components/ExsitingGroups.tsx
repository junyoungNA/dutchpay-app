import React from 'react'
import { Container, Row } from 'react-bootstrap'
import styled from 'styled-components'

interface IExsitingGroups {

}

const ExsitingGroups = ({groupNames}) => {
    const test = ['제주도 다녀오기', '글램핑 캠핑장에 마트에서 산 물품들 정리', '어쩌다보니 여기까지왓네 이거 맞나?']
    return (
        <StyledGroupContainer>
            <h5>나준영님이 속한 그룹 목록!</h5>
            {test.map((item) => 
                <div>{item}</div>
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
