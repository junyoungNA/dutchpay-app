import { Col } from "react-bootstrap";
import styled, {css} from "styled-components";


interface IStyledBootStrapColProps {
    gap?: string;
    width?:string;
    height?: string;
    margin?:string;
    
}

export const StyledBootStrapCol = styled(Col)<IStyledBootStrapColProps>`
    display: flex;
    align-items: center;
    flex-direction: column;
    position: relative;
    margin: ${({margin}) => (margin && margin)};;
    /* max-width: ${({maxWidth}) => (maxWidth ? maxWidth : '0')}; */
    width: ${({width}) => (width && width )};
    height: ${({height}) => (height && height )};
    gap:${({gap}) => (gap ? gap : '0')};
    
    ${({ hover  }) =>
        hover === 'true' &&
        css`
        opacity: 0.3;
        /* border: 1px solid #fff; */
        transition: opacity 0.4s;
            &:hover {
                opacity: 0.8;
                transition: opacity 0.5s;
            }
        `
    };
`