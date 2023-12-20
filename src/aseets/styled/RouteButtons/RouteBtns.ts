import styled, { css } from "styled-components"
import Lottie from 'lottie-react';

export const StlyedDutchpayLottie = styled(Lottie)`
    width: 40px;
    height: 40px;
    border-radius: 100%;
    position: absolute;
    left: 10px;
`

export const StlyedCalendarLottie = styled(Lottie)`
    width: 125px;
    height: 125px;
    border-radius: 100%;
    position: absolute;
    left: -35px;
    pointer-events: none;
`

export const StlyedPlanLottie = styled(Lottie)`
    width: 55px;
    height: 40px;
    position: absolute;
    pointer-events: none;
    left: 5px;
`
interface IStyledNavBtnProps  {
    background? : string;
    width ? : string;
    height? : string;
    hover? : string;
}
export const StlyedNavBtn  = styled.button<IStyledNavBtnProps>`
    border-radius: 15px;
    font-weight:700;
    font-size: 18px;
    width:  ${({width}) => (width ? width : '120px')};
    height: ${({height}) => (height ? height : '50px')};
    border: none;
    background-color: ${({background}) => (background ? background : 'gray')};
    ${({ hover  }) =>
        hover === 'true' &&
        css`
        margin-top: 30px;
            &:hover {
                transition: 0.3s;
                background-color: rgb(175, 19, 0);
                color: #fff;
            }
        `
    };
`