import useWindowSize from '../../hooks/useWindowSize'
import layoutChangeSizeCheck from '../../util/layoutChangeSizeCheck'
import NaviSideContainer from '../Navi/NaviSideContainer'

const NaviSide = () => {
    const { width: windowWidth } = useWindowSize();
    const isNavisideRender = layoutChangeSizeCheck(1100, windowWidth);
    return (
        <>
            {isNavisideRender && <NaviSideContainer/>}
        </>
    )
}

export default NaviSide
