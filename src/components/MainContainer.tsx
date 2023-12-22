import React from 'react';
import RightSide from './main/RightSide';
import LeftSide from './main/LeftSide';
import NaviSide from './main/NaviSide';
import { StyledBootStrapRow } from '../aseets/styled/BootStrapRow';
import { StyledBootStrapContainer } from '../aseets/styled/BootStrapContainer';
import useWindowSize from '../hooks/useWindowSize';

const MainContainer:React.FC = () => {
    const { width: windowWidth } = useWindowSize();
    const isRenderRouteBtnGroups = windowWidth >= 1100;
    return (
        <StyledBootStrapContainer height={'100%'}>
            <StyledBootStrapRow minHeight={'500px'}>
                    {/* 왼쪽 사이드 */}
                    <LeftSide/>
                    {/* 오른쪽 사이드 */}
                    <RightSide />
                    {/* 밑에 Navigation 사이드 */}
                    {isRenderRouteBtnGroups && <NaviSide/>}
            </StyledBootStrapRow>
        </StyledBootStrapContainer>
    )
}

export default MainContainer
