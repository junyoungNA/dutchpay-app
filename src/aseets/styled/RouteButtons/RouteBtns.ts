import styled from "styled-components"
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

export const StlyedNavBtn  = styled.button<{background? : string}>`
    border-radius: 15px;
    font-weight:700;
    font-size: 16px;
    height: 50px;
    border: none;
    /* position: absolute; */
    bottom: 50px;
    background-color: ${({background}) => (background ? background : 'gray')};
`