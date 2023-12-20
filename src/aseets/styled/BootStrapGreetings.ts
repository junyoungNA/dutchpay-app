import styled from "styled-components";

interface IStyledGreetingProps  {
    fontSize ? : string;
    fontWeight?: string;
    lineHeight ?: string;
    color? : string
}

export const StyledGreetings = styled.div<IStyledGreetingProps>`
    color: ${({color}) => (color ? color : '#eeeded')};
    font-weight:${({fontWeight}) => (fontWeight ? fontWeight : 600)};
    letter-spacing: 0.5px;
    text-align: center;
    line-height:${({lineHeight}) => (lineHeight ? lineHeight : '30px')};
    white-space: pre-wrap;
    font-size: ${({fontSize}) => (fontSize ? fontSize : '18px')};
`