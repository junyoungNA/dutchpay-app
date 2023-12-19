import { Col } from "react-bootstrap";
import styled from "styled-components";


interface IStyledBootStrapColProps {
    gap?: string,
    width?:string,
}

export const StyledBootStrapCol = styled(Col)<IStyledBootStrapColProps>`
    display: flex;
    align-items: center;
    flex-direction: column;
    /* max-width: ${({maxWidth}) => (maxWidth ? maxWidth : '0')}; */
    width: ${({width}) => (width && width )};
    gap:${({gap}) => (gap ? gap : '0')};;
`