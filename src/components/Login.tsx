import React from 'react';
import { Row } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import styled from 'styled-components';
import RightSide from './main/RightSide';
import LeftSide from './main/LeftSide';

const Login:React.FC = () => {
    return (
        <StyledContainer style={{gap:'2'}}>
            <StyledRow >
                {/* 왼쪽 사이드 */}
                <LeftSide/>
                {/* 오른쪽 사이드 */}
                <RightSide/>
            </StyledRow>
        </StyledContainer>
    )
}

const StyledRow = styled(Row)`
    display:'flex';
    justify-content: center;
    align-items: center;
    margin: auto;
    min-height: 500px;
`

const StyledContainer = styled(Container)`
    display: flex;
    height: 100vh;
`

export default Login
