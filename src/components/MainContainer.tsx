import React from 'react';
import { Container } from 'react-bootstrap';
import styled from 'styled-components';
import RightSide from './main/RightSide';
import LeftSide from './main/LeftSide';
import NaviSide from './main/NaviSide';
import { StyledMainRow } from '../aseets/styled/BootStrapRow';
import { StyledMainContainer } from '../aseets/styled/BootStrapContainer';

const MainContainer:React.FC = () => {
    return (
        <StyledMainContainer height='100vh'>
            <StyledMainRow minHeight='500px'>
                {/* 왼쪽 사이드 */}
                <LeftSide/>
                {/* 오른쪽 사이드 */}
                <RightSide/>
                {/* 밑에 Navigation */}
                {/* <NaviSide/> */}
            </StyledMainRow>
        </StyledMainContainer>
    )
}

export default MainContainer
