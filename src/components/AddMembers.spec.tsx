import { render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import  AddMembers  from "./AddMembers";
import { RecoilRoot } from "recoil";
// import { InputTags } from 'react-bootstrap-tagsinput';


const renderComponent = () => {
    //render 함수('렌더링할컴포넌트')
    render(
        <RecoilRoot>
            <AddMembers/>
        </RecoilRoot>
        );

    // <div data-test-id="id"> getByTestId 해당 test-id 프로퍼티의 값을 가져옴
    const input = screen.getByTestId('input-member-names');
    const saveButton = screen.getByText('저장');
    // const errorMessage = screen.queryByText('그룹 이름을 입력해 주세요.');
    
    //공통으로 사용될 Elemnet DOM 요소들을 renderComponent함수에서 생성
    return {
        input,
        saveButton
    }
};

//describe : 여러 개의 테스틈 함수를 묶을 때 사용
describe('그룹 맴버 추가하기', () => {
//test 함수 ('test할 내용의 이름' 콜백함수 실행될 테스트 코드)
    test('그룹 멤버 이름 입력 컴포넌트가 렌더링 되는가', () => {
        const {input, saveButton} = renderComponent();//CreateGroup이 렌더링된다.
        expect(input).not.toBeNull();
        expect(saveButton).not.toBeNull(); 
    });

    test('그룹 멤버를 입력하지 않고 "저장" 버튼을 클릭시, 에러 메시지를 노출한다', async () => {
        const {saveButton} = renderComponent();//CreateGroup이 렌더링된다.
        await userEvent.click(saveButton)
        //findbyText는 promise를 반환하게된다.
        //findByText :  DOM 의 인자로 주어진 값이 나타는지를 찾아낸다.
        const errorMessage = await screen.findByText('그룹 멤버들의 이름을 입력해 주세요.');
        //toBeInTheDocument :인자로 주언지 element가 현재 HTML document에 있는지를 확인해준다?
        expect(errorMessage).toBeInTheDocument();
    });

    test('그룹 멤버 이름을 입력한 후 "저장" 버튼을 클릭시, 저장에 성공',  async () => {
        const {input, saveButton} = renderComponent();//CreateGroup이 렌더링된다.
        await userEvent.type(input, '철수 영희 영수');
        await userEvent.click(saveButton);
        //findbyText는 promise를 반환하게된다.
        //findByText :  DOM 의 인자로 주어진 값이 나타는지를 찾아낸다.
        const errorMessage = screen.queryByText('그룹 멤버들의 이름을 입력해 주세요.');
        expect(errorMessage).toBeNull(); //저장 성공시 에러는 null!
    })
})