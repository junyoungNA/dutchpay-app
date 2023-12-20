import styled from "styled-components";


interface IStyledBootStrapLayoutWrapperProps {
    position ?: string;
}

export const StyledBootStrapLayoutWrapper = styled.div<IStyledBootStrapLayoutWrapperProps>`
    position: ${({position}) => (position ? position : 'static' )};
    top: 55%;
    left: 50%;
    transform: translate(-50%, -50%);
`