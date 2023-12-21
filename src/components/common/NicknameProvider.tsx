import React from 'react'
import { useRecoilValue } from 'recoil';
import { kakaoUser } from '../../atom/kakaoUser';

const NicknameProvider = () => {
    const {nickname} = useRecoilValue(kakaoUser);

    return (
        <>
            qweq
        </>
    )
}

export default NicknameProvider
