import { render, screen, within} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import  ExpenseMain  from "./dutchpay/ExpenseMain";
import { RecoilRoot } from "recoil";
import { groupMemberState } from "../atom/groupMembers";

const renderComponent = () => {
    //render 함수('렌더링할컴포넌트')
    render(
        <RecoilRoot initializeState={(snap) => {
            // Recolid에서 기본값을 설정가능? snapshot이라는 것을통해
            snap.set(groupMemberState, ['영수', '영희']);
        }}>
            <ExpenseMain/>
        </RecoilRoot>
        );
    // 이미있는 DOM element를 가져올때는 getBy?사용
    const dateInput = screen.getByPlaceholderText(/결제한 날짜/i);
    const desInput = screen.getByPlaceholderText(/비용에 대한 설명/i);
    const amountInput = screen.getByPlaceholderText(/비용은 얼마/i);
    const payerInput = screen.getByDisplayValue(/누가 결제/i);
    const addButton = screen.getByText('추가하기');
    const descErrorMessage = screen.getByText('비용 내용을 입력해 주셔야 합니다.');
    const payerErrorMessage = screen.getByText('결제자를 선택해 주셔야 합니다.');
    const amountErrorMessage = screen.getByText('금액을 입력해 주셔야 합니다.');

    //공통으로 사용될 Elemnet DOM 요소들을 renderComponent함수에서 생성
    return {
        dateInput,
        desInput,
        amountInput,
        payerInput,
        addButton,
        descErrorMessage,
        payerErrorMessage,
        amountErrorMessage
    }
};

describe('비용 정산 메인 페이지', () => {
    //비용 추가 컴포넌트 관련 테스트
    describe('비용 추가 컴포넌트', () => { 
            test('비용 추가 컴포넌트 렌더링', () => {
                const {     
                    dateInput,
                    desInput,
                    amountInput,
                    payerInput,
                    addButton
                } = renderComponent();//CreateGroup이 렌더링된다.
                //해당 컴포넌트들이 Document에 있는지 확인
                expect(dateInput).toBeInTheDocument();
                expect(desInput).toBeInTheDocument();
                expect(amountInput).toBeInTheDocument();
                expect(payerInput).toBeInTheDocument();
                expect(addButton).toBeInTheDocument();
            });
        
            test('비용 추가에 필수적인 값을 채우지 않고 "추가" 버튼 클릭시 에러 메시지를 노출한다.', async () => {
                const {addButton, descErrorMessage, payerErrorMessage, amountErrorMessage} = renderComponent(); //add 버튼 가져오기

                expect(addButton).toBeInTheDocument(); //add 버튼 컴포넌트 document에있는지확인?
                await userEvent.click(addButton); //user가 add버튼 클릭

                //errorMessage가 출력된 text를 가져오기
                // const descErrorMessage = screen.getByText('비용 내용을 입력해 주셔야 합니다.');
                expect(descErrorMessage).toHaveAttribute('data-valid', 'false'); //add버튼을 클릭시 이미 errorMessage들이 DOM에 있어야함

                // const payerErrorMessage = screen.getByText('결제자를 선택해 주셔야 합니다.');
                expect(payerErrorMessage).toHaveAttribute('data-valid', 'false');

                // const amountErrorMessage = screen.getByText('금액을 입력해 주셔야 합니다.');
                expect(amountErrorMessage).toHaveAttribute('data-valid', 'false');

            });
            test('비용 추가에 필수적인 값들을 입력한 후 "추가" 버튼 클릭시, 저장에 성공.', async () => {
                const { 
                    addButton,  
                    desInput,
                    amountInput,
                    payerInput,
                    descErrorMessage,
                    payerErrorMessage,
                    amountErrorMessage,
                } = renderComponent();
            await userEvent.type(desInput, '장보기');
            await userEvent.type(amountInput, '3000');
            //playerInput 멤버 이름들의 selectoption을 사용함
            await userEvent.selectOptions(payerInput, '영수');
            await userEvent.click(addButton);
            //DOM 무조건적으로 있지 않으므로 query를 사용
            // const descErrorMessage = screen.queryByText('비용 내용을 입력해 주셔야 합니다.');
            expect(descErrorMessage).toHaveAttribute('data-valid', 'true');

            // const payerErrorMessage = screen.queryByText('결제자를 선택해 주셔야 합니다.');
            expect(payerErrorMessage).toHaveAttribute('data-valid', 'true');

            // const amountErrorMessage = screen.queryByText('금액을 입력해 주셔야 합니다.');
            expect(amountErrorMessage).toHaveAttribute('data-valid', 'true');
        });
    });
    describe('비용 리스트 컴포넌트', () => {
        test('비용 리스트 컴포넌트가 렌더링 되는가?', () => {
            renderComponent();
            const expenseListComponent = screen.getByTestId('expenseList');
            expect(expenseListComponent).toBeInTheDocument();
        });
        describe('정산 결과 컴포넌트', () => {
            test('정산 결과 컴포넌트가 렌더링 되는가?', () => {
                renderComponent();

                const component = screen.queryByText(/정산은 이렇게/i);
                expect(component).toBeInTheDocument();

                // 정산 결과 밑에 나올 결과값들 확인
                // const expenseResultomponent = screen.getAllByTestId('expenseResult');
                // expect(expenseResultomponent).toBeInTheDocument();
            })
        })
    });

    describe('새로운 비용이 입력되었을때', () => {
        const addNexExpense = async () => {
            const {     
                dateInput,
                desInput,
                amountInput,
                payerInput,
                addButton
            }= renderComponent();

            await userEvent.type(dateInput, '2023-10-10');
            await userEvent.type(desInput, '장보기');
            await userEvent.type(amountInput, '3000');
            await userEvent.selectOptions(payerInput, '영수');
            await userEvent.click(addButton);
        }
        test('날짜, 내용, 결제자, 금액 데이터가 정산 리스트에 추가 되는가?', async () => {
            await addNexExpense();
            //새로운 비용을 입력
            //within 특정 컴포넌트 안에서 Dom접근 가능
            const expenseListComponent = screen.getByTestId('expenseList');
            const dataValue = within(expenseListComponent).getByText('2023-10-10');
            expect(dataValue).toBeInTheDocument();

            const descValue= within(expenseListComponent).getByText('장보기');
            expect(descValue).toBeInTheDocument();

            const payerValue1 = within(expenseListComponent).getByText('영수');
            expect(payerValue1).toBeInTheDocument();

            const amountValue = within(expenseListComponent).getByText('3000 원');
            expect(amountValue).toBeInTheDocument();
        });
        test('정산 결과 또한 업데이트가 된다?', async () => {
            await addNexExpense();

            const totalText = screen.getByText(/2명 - 총 3000 원 지출/i);
            expect(totalText).toBeInTheDocument();
            const transactionText = screen.getByText(/영희가 영수 에게 1500 원/i);
            expect(transactionText).toBeInTheDocument();
        })
    })
})