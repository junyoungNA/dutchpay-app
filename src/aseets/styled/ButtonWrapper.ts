import styled from "styled-components";


interface ButtonWrapperProps {
    background?: string; // primary prop의 타입을 정의
}

export const StyledButtonWrapper = styled.div<ButtonWrapperProps>`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 15px;
    height: 50px;
    margin-left: 20px;
    font-weight: 700;
    font-size: 16px;
    width: 300px;
    background-color: ${({background}) => (background ? background : 'gray')};
    cursor: pointer;
`