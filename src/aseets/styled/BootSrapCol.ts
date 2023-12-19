import { Col } from "react-bootstrap";
import styled, {css} from "styled-components";


interface IStyledBootStrapColProps {
    gap?: string,
    width?:string,
    height?: string,
}

export const StyledBootStrapCol = styled(Col)<IStyledBootStrapColProps>`
    display: flex;
    align-items: center;
    flex-direction: column;
    /* max-width: ${({maxWidth}) => (maxWidth ? maxWidth : '0')}; */
    width: ${({width}) => (width && width )};
    height: ${({height}) => (height && height )};
    gap:${({gap}) => (gap ? gap : '0')};

    ${({ hover }) =>
        hover === true &&
        css`
        /* overflow: hidden; */
        opacity: 0.2;
        transition: opacity 0.5s;
            &:hover {
                opacity: 0.5;
                transition: opacity 0.5s;
            }
        `
    };
`