// useCurrentKakaoMap.ts
import { useRecoilState } from 'recoil';
import { currentKakaoMap } from '../atom/currentKakaoMap'; // 실제 atom 파일 경로로 수정

const useCurrentKakaoMap = () => {
  const [currentMap, setCurrentMap] = useRecoilState(currentKakaoMap);

  return { currentMap, setCurrentMap };
};

export default useCurrentKakaoMap;