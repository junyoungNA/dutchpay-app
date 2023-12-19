import { Row } from "react-bootstrap";
import styled from "styled-components";


interface IStyledBootStrapRowProps {
    minHeight?: string, // primary prop의 타입을 정의
    gap? : string,
    hover ? : boolean
}


export const StyledBootStrapRow = styled(Row)<IStyledBootStrapRowProps>`
    display:'flex';
    justify-content: center;
    align-items: center;
    margin: auto;
    min-height: ${({minHeight}) => (minHeight ? minHeight : '0')};
    gap : ${({gap}) => (gap ? gap : '0')};
    
    
`