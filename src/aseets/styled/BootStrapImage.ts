import { Image } from "react-bootstrap";
import styled from "styled-components";


interface IStyledBootStrapImageProps {
    height?: string; // primary prop의 타입을 정의
}

export const StyledBootStrapImage = styled(Image)<IStyledBootStrapImageProps>`
    width:100%;
    height:100%;
    object-fit: cover;
`