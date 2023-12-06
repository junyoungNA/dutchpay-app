// 유저 정보를 가져오는 커스텀 훅
import { useCallback } from 'react';
import { getKakaoUserInfo } from '../util/api/authApi';
import showAlert from '../util/shoAlert';
import { useRouter } from './useRouter';
import { useResetRecoilState } from 'recoil';
import { kakaoUser } from '../atom/kakaoUser';
// interface IUseFetchUserInfoProps {
//     resetKakaoUser: () => void;
//     routeTo: (path: string) => void;
// }

// type FetchUserInfo = () => Promise<void>;

const useFetchUserInfo = () => {
    const {routeTo} = useRouter();
    const resetKakaoUser = useResetRecoilState(kakaoUser);
    const fetchUserInfo = useCallback(async () => {
        try {
        const { idUser } = await getKakaoUserInfo();
        // console.log(idUser, nickname, 'layout 확인결과');
        if (!idUser) {
             // 의문점 
            //callback 의존성 배열에 children을 빼도 될까?
            //내생각은 빼야할 것 같다 callback 함수의 재생성을 막기위한 것
            // compoenet가 바뀔때마다 재생성하는 것은 좋지 않은 것 같다
            showAlert('죄송합니다. 다시 로그인해주세요.');
            resetKakaoUser();
            return routeTo('/');
        }
        } catch (error) {
        showAlert('죄송합니다. 다시 로그인해주세요.');
        }
    }, [resetKakaoUser, routeTo]);

    return fetchUserInfo;
};

export default useFetchUserInfo;