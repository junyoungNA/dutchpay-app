import { Row } from "react-bootstrap";
import styled from "styled-components";


interface IStyledBootStrapContainerProps {
    height?: string; // primary prop의 타입을 정의
}


export const StyledMainContainer = styled(Row)<IStyledBootStrapContainerProps>`
    width: 100%;
    /* display: flex; */
    height: ${({height}) => (height ? height : '0')};
`