import Lottie from 'lottie-react';
import { book_animation } from '../../aseets';
import { StyledBootStrapCol } from '../../aseets/styled/BootStrapCol';

const LeftSide = () => {
    return (
        <StyledBootStrapCol md={6} width='780px'>
            <Lottie 
                animationData ={book_animation}
            />
        </StyledBootStrapCol>
    )
}

export default LeftSide
