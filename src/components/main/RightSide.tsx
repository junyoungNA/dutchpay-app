import ServiceLogo from '../shared/ServiceLogo';
import styled from 'styled-components';
import { Col } from 'react-bootstrap';
import RouteBtns from './RouteBtns';


const RightSide = () => {
    return (
        <StyleRouteCol lg={4} md={5} >
            <ServiceLogo/>
            <RouteBtns/>
        </StyleRouteCol>
    )
}
const StyleRouteCol = styled(Col)`
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 0;
    gap: 15px;
`

export default RightSide
