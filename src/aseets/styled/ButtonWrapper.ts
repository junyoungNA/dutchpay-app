import styled from "styled-components";


interface IButtonWrapperProps {
    background?: string; // primary prop의 타입을 정의
}

export const StyledButtonWrapper = styled.div<IButtonWrapperProps>`
    position: relative;
    display:  flex;
    justify-content: center;
    align-items: center;
    border-radius: 15px;
    height: 50px;
    font-weight: 700;
    font-size: 16px;
    width: 280px;
    background-color: ${({background}) => (background ? background : 'gray')};
    cursor: pointer;
`