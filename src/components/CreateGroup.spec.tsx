import { render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import  CreateGroup  from "./CreateGroup";
import { RecoilRoot } from "recoil";

const renderComponent = () => {
    //render 함수('렌더링할컴포넌트')
    render(
        <RecoilRoot>
            <CreateGroup/>
        </RecoilRoot>
        );

    const input = screen.getByPlaceholderText('2022 제주도 여행');
    const saveButton = screen.getByText('저장');
    const errorMessage = screen.queryByText('그룹 이름을 입력해 주세요.');
    const groupMessage = screen.queryByText('속한 그룹들');
    //공통으로 사용될 Elemnet DOM 요소들을 renderComponent함수에서 생성
    return {
        input,
        saveButton,
        errorMessage,
        groupMessage
    }
};
//describe : 여러 개의 테스틈 함수를 묶을 때 사용
describe('그룹 생성페이지', () => {
//test 함수 ('test할 내용의 이름' 콜백함수 실행될 테스트 코드)
    test('그룹 이름 입력 컴포넌트가 렌더링 되는가', () => {
        const {input, saveButton} = renderComponent();//CreateGroup이 렌더링된다.

        //todo : input component
        //특정 placeholder텍스트를 가진 요소를 찾아서 존재 여부 확인
        //getBy DOM에서 하나만 가져온다
        // const input = screen.getByPlaceholderText('2022 제주도 여행');
        expect(input).not.toBe(null);
        //expect 특정 값을 검사하는 함수
        //에러처리를 하는 구문 input에 값은 null값이 아니여야한다!
        //todo: save button
        // const saveButton = screen.getByText('저장');
        expect(saveButton).not.toBeNull(); 
    });
    //에러 메시지를 노출
    test('그룹 이름을 입력하지 않고  "저장" 버튼을 클릭시, 에러 메시지를 노출한다.', () => {
        const {saveButton, errorMessage} = renderComponent() 

        // const saveButton = screen.getByText('저장');
        //userEvent.click('클릭 이벤트가 발생되는 Element') 유저가 클릭이벤트를 발생시킨 것 처럼 동작 
        userEvent.click(saveButton);
        // const errorMessage = screen.queryByText('그룹 이름을 입력해 주세요.');
        expect(errorMessage).toHaveAttribute('data-validate', 'false');
    });

    test('그룹 이름을 입력후, "저장" 버튼을 클릭시, 저장 성공', async() => {
        const {input, saveButton, errorMessage} = renderComponent();
        //userEvent를 사용해 유저가 input에 텍스를 입력하는 mock을 생성
        //해당 type함수가 다 완료가 된후 click이벤트가 발생해야하므로 비동기로 동작
        await userEvent.type(input, '예시 그룹명');
        await userEvent.click(saveButton);

        expect(errorMessage).toHaveAttribute('data-validate', 'true'); //저장 성공이라면 null값이 나와야함!
    });

    test('유저가 속한 그룹들이 존재한다면 그룹들이 렌더링 되는가', async() => {
        const {groupMessage} = renderComponent();

        expect(groupMessage).not.toBeNull();
    });
})