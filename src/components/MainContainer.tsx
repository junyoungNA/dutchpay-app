import React from 'react';
import RightSide from './main/RightSide';
import LeftSide from './main/LeftSide';
import NaviSide from './main/NaviSide';
import { StyledBootStrapRow } from '../aseets/styled/BootStrapRow';
import { StyledBootStrapContainer } from '../aseets/styled/BootStrapContainer';

const MainContainer:React.FC = () => {
    return (
        <StyledBootStrapContainer height={'100%'}>
            <StyledBootStrapRow minHeight={'500px'}>
                    {/* 왼쪽 사이드 */}
                    <LeftSide/>
                    {/* 오른쪽 사이드 */}
                    <RightSide />
                    {/* 밑에 Navigation 사이드 */}
                    <NaviSide/>
            </StyledBootStrapRow>
        </StyledBootStrapContainer>
    )
}

export default MainContainer
