import Lottie from 'lottie-react';
import { loginSide_animation } from '../../aseets';
import { Col } from 'react-bootstrap';

const LeftSide = () => {
    return (
        <Col lg={8} md={7} >
            <Lottie animationData ={loginSide_animation} />
        </Col>
    )
}

export default LeftSide
