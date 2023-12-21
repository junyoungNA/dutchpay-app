import React, { ReactElement, ReactNode } from 'react'
import { useRecoilValue } from 'recoil';
import { kakaoUser } from '../../atom/kakaoUser';

interface NicknameProviderProps {
    children: ReactNode;
}

const NicknameProvider = ({children} : NicknameProviderProps) => {
    const {nickname} = useRecoilValue(kakaoUser);

    return (
        <div>
            {React.cloneElement(children as ReactElement, { nickname })}
        </div>
    )
}

export default NicknameProvider
