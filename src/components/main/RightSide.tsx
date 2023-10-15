import ServiceLogo from '../shared/ServiceLogo';
import styled from 'styled-components';
import { Col } from 'react-bootstrap';
import RouteBtns from './RouteBtns';


const RightSide = () => {
    return (
        <StyleRouteCol lg={4} md={5} >
            <ServiceLogo/>
            <StyledGreetings>안녕하세요~ 플랜 B를 통해 <br/>언제든 계획을 수립하고 기록해보세요</StyledGreetings>
            <RouteBtns/>
        </StyleRouteCol>
    )
}

const StyledGreetings = styled.div`
    font-weight:500;
    font-size: 16px;
    text-align: center;
    line-height: 30px;
    white-space: pre;
`

const StyleRouteCol = styled(Col)`
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 0;
    gap: 15px;
`

export default RightSide
