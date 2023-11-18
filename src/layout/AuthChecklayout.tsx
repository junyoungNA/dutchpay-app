import React, { useCallback, useEffect } from 'react';
import { getKakaoUserInfo } from '../util/api/authApi';
import { useRecoilValue } from 'recoil';
import { kakaoUser } from '../state/kakaoUser';
import { useRouter } from '../hooks/useRouter'
import showAlert from '../util/shoAlert';

interface GeneralLayoutProps {
children: React.ReactNode
}

const AuthCheckLayout: React.FC<GeneralLayoutProps> = ({children}) => {
    const userInfo = useRecoilValue(kakaoUser);
    const {routeTo} = useRouter();

    const fetchUserInfo = useCallback(async () => {
        // 페이지 이동시 마다 로그인 여부를 확인하는 함수 구현
        // 로그인 성공시 userInfo 상태 업데이트
        // 로그인 실패시 로그인 페이지로 이동 ('/login')
        try {
            // const result = await getKakaoUserInfo(userInfo);
            // console.log(result,'layout 확인결과');
            // if(!result) {
            //     showAlert('죄송합니다. 다시 로그인해주세요.');
            //     return routeTo('/');
            // }

        } catch (error) {
            console.log(error,'로그인 오류');
            showAlert('죄송합니다. 다시 로그인해주세요.')
            // 의문점 
            //callback 의존성 배열에 children을 빼도 될까?
            //내생각은 빼야할 것 같다 callback 함수의 재생성을 막기위한 것
            // compoenet가 바뀔때마다 재생성하는 것은 좋지 않은 것 같다
        }
    }, [routeTo]);

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
    if(!userInfo) return (<div>loading...</div>)

    return (
        <div className="general-layout">
                <div className="general-layout__body">
                    { children }
                </div>
        </div>
    )
}

export default AuthCheckLayout;
