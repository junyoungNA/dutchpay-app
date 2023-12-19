import { Row } from "react-bootstrap";
import styled from "styled-components";


interface IStyledMainRowProps {
    minHeight?: string; // primary prop의 타입을 정의
}


export const StyledMainRow = styled(Row)<IStyledMainRowProps>`
    display:'flex';
    justify-content: center;
    align-items: center;
    margin: auto;
    min-height: ${({minHeight}) => (minHeight ? minHeight : '0')};
`