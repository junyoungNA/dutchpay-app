import React, {useEffect } from 'react';
import { useRouter } from '../hooks/useRouter'
import { useResetRecoilState } from 'recoil';
import { kakaoUser } from '../atom/kakaoUser';
import useFetchUserInfo from '../hooks/useFetchUserInfo ';

interface GeneralLayoutProps {
children: React.ReactNode
}

const AuthCheckLayout: React.FC<GeneralLayoutProps> = ({children}) => {
    const resetKakaoUser = useResetRecoilState(kakaoUser);
    const {routeTo} = useRouter();
    // 커스텀 훅
    const fetchUserInfo = useFetchUserInfo({ resetKakaoUser, routeTo });

    useEffect(() => {
    //페이지 이동시 마다 로그인 여부를 확인하는 함수 실행
        fetchUserInfo();
        console.log('page changed!');
        // 의문점
        // 의존성배열에 children을 빼도 될까?
        // 내 생각은 넣어야 할 것 같다. 페이지가 바뀔때 마다 body 즉 children 도 
        // 바뀔 것이니 계속해서 fetchUserInfo로 유저의 정보를 확인해야할 것 같다.
        // 생각해보니 페이지를 바꿀때마다 유저의 유효성 검증을 하는 것이 맞을까?
    }, [children, fetchUserInfo])

    // loading중 상태를 고려해서 컴포넌트를 만들어야 할듯!
    // if(!userInfo) return (<div>loading...</div>)
    return (
        <div className="general-layout">
                <div className="general-layout__body">
                    { children }
                </div>
        </div>
    )
}

export default AuthCheckLayout;
