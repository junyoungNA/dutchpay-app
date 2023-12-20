import { Row } from "react-bootstrap";
import styled from "styled-components";


interface IStyledBootStrapContainerProps {
    height?: string; // primary prop의 타입을 정의
}


export const StyledBootStrapContainer = styled(Row)<IStyledBootStrapContainerProps>`
    width: 100%;
    /* overflow: hidden; */
    height: ${({height}) => (height ? height : '100vh')};
;
`