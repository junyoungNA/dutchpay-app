import React, { useCallback, useEffect } from 'react';
import { getKakaoUserInfo } from '../util/api/authApi';
import { useRecoilState } from 'recoil';
import { kakaoUser } from '../state/kakaoUser';
import { useRouter } from '../hooks/useRouter'

interface GeneralLayoutProps {
children: React.ReactNode
}

const GeneralLayout: React.FC<GeneralLayoutProps> = ({children}) => {
    const [userInfo, setUserInfo] = useRecoilState(kakaoUser);
    const {routeTo} = useRouter();

    const fetchUserProfile = useCallback(async () => {
        // TODO 3-2: 페이지 이동시 마다 로그인 여부를 확인하는 함수 구현
        // 로그인 여부 확인 ('/profile' 호출 성공여부 확인)
        // 로그인 성공시 userProfile 상태 업데이트
        // 로그인 실패시 로그인 페이지로 이동 ('/login')
        const token = localStorage.getItem('accessToken');
        console.log(token,'layout 토큰');
        if(!token) return routeTo('/login');
        const result = await getKakaoUserInfo(token);
        console.log(result,'layout 확인결과');
        if(!result) return routeTo('/login');
    }, [])

    useEffect(() => {
    // TODO 3-2: 페이지 이동시 마다 로그인 여부를 확인하는 함수 실행
    fetchUserProfile();
    console.log('page changed!');
    }, [children])

  // if(!userProfile) return (<div>loading...</div>)

    return (<div className="general-layout">
            <div className="general-layout__body">
                { children }
            </div>
    </div>)
}

export default GeneralLayout
