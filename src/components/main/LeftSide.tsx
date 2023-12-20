import Lottie from 'lottie-react';
import { book_animation } from '../../aseets';
import { StyledBootStrapCol } from '../../aseets/styled/BootStrapCol';

const LeftSide = () => {
    return (
        <StyledBootStrapCol md={5} width='700px'>
            <Lottie 
                animationData ={book_animation}
            />
        </StyledBootStrapCol>
    )
}

export default LeftSide
