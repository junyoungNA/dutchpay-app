import RouteBtnGroups from './RouteBtnGroups'
import { Row, Col } from 'react-bootstrap'
import styled from 'styled-components'

const NaviSide = () => {
    return (
        <Row>
            <StyledCol md={2}>1</StyledCol>
            <StyledCol md={2}>2</StyledCol>
            <StyledCol md={2}>3</StyledCol>
            {/* <RouteBtnGroups/> */}
        </Row>
    )
}

const StyledCol = styled(Col)`
    color: white;


`

export default NaviSide
