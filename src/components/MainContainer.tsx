import React from 'react';
import RightSide from './main/RightSide';
import LeftSide from './main/LeftSide';
import NaviSide from './main/NaviSide';
import { StyledBootStrapRow } from '../aseets/styled/BootStrapRow';
import { StyledBootStrapContainer } from '../aseets/styled/BootStrapContainer';
import { useRecoilValue } from 'recoil';
import { kakaoUser } from '../atom/kakaoUser';
import NicknameProvider from './common/NicknameProvider';
// import { StyledBootStrapLayoutWrapper } from '../aseets/styled/BootStrapLayoutWrapper';

const MainContainer:React.FC = () => {
    return (
        <StyledBootStrapContainer height={'100%'}>
            <StyledBootStrapRow minHeight={'500px'}>
                <NicknameProvider>
                    {/* 왼쪽 사이드 */}
                    <LeftSide/>
                    {/* 오른쪽 사이드 */}
                    <RightSide nickname={''} />
                    {/* 밑에 Navigation 사이드 */}
                    {/* <NaviSide/> */}
                </NicknameProvider>
            </StyledBootStrapRow>
        </StyledBootStrapContainer>
    )
}

export default MainContainer
