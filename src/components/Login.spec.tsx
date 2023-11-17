import { render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Login from "./MainContainer";

const renderComponent = () => {
    //render 함수('렌더링할컴포넌트')
    render(
            <Login/>
        );
    const loginButton = screen.getByText('카카오 로그인');
    
    //공통으로 사용될 Elemnet DOM 요소들을 renderComponent함수에서 생성
    return {
        loginButton,
    }
};
//describe : 여러 개의 테스틈 함수를 묶을 때 사용
describe('로그인 페이지', () => {
//test 함수 ('test할 내용의 이름' 콜백함수 실행될 테스트 코드)
    test('로그인 페이지, 카카오톡 로그인 버튼이 렌더링 되는가', () => {
        const {loginButton} = renderComponent();//CreateGroup이 렌더링된다.

        //todo : input component
        //특정 placeholder텍스트를 가진 요소를 찾아서 존재 여부 확인
        //getBy DOM에서 하나만 가져온다
        // const input = screen.getByPlaceholderText('2022 제주도 여행');
        expect(loginButton).not.toBe(null);
        //expect 특정 값을 검사하는 함수
        //에러처리를 하는 구문 input에 값은 null값이 아니여야한다!
    });
});