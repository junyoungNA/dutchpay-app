import styled from "styled-components";


interface IStyledBootStrapLayoutWrapperProps {
    position ?: string;
    top?:string;
    left? : string;
    flex ? : string;
    translate? : string;
}

export const StyledBootStrapLayoutWrapper = styled.div<IStyledBootStrapLayoutWrapperProps>`
    position: ${({position}) => (position ? position : 'static' )};
    top: ${({top}) => (top ? top : '0' )};
    left:  ${({left}) => (left ? left : '0' )};
    transform: translate(-50%, -50%);
    display: ${({flex}) => (flex && flex)};;
`