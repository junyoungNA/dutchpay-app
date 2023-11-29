import { Card, CloseButton } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Map, MapMarker,CustomOverlayMap } from 'react-kakao-maps-sdk';
import styled from 'styled-components';
import { IMarkers, StyledDirectionBtn, TArriveAndDeparture, TMarkers } from './PlanMap';
import { Dispatch, SetStateAction, useState } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { kakaoAddressInfoState } from '../../atom/kakaoAddressInfo';
import { mapArrive } from '../../atom/mapArrive';
import { mapDeparture } from '../../atom/mapDeparture';

interface IMapSideProps {
    setMap : Dispatch<SetStateAction<any>>,
    markers : IMarkers[],
    markerInfo : any,
    setMarkerInfo :  Dispatch<SetStateAction<any>>,
    onClickChangePoint : (placeName: string, type: "departure" | "arrive") => () => void,
    onClickSearchDirection : (arriveAndDeparture : TArriveAndDeparture, coordinate : TMarkers) => void,
}

const MapSide: React.FC<IMapSideProps> = ({setMap, markers, markerInfo, setMarkerInfo, onClickChangePoint, onClickSearchDirection }) => {
    const [zoomable, setZoomable] = useState(true) //zoom 막기
    const {x , y} = useRecoilValue(kakaoAddressInfoState);
    const [arrive, setArrive] = useRecoilState(mapArrive);
    const departure= useRecoilValue(mapDeparture);

    return (
        <StyledPlanMap 
            center={{ lat: y, lng: x }}   // 지도의 중심 좌표
            level={3}// 지도 확대 레벨
            zoomable={zoomable}
            onCreate={setMap}
        >
        {markers.map((marker : any) => (
            <>
                <MapMarker
                    key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
                    position={marker.position}
                    onClick={() => setMarkerInfo(marker)}
                    />
                    {markerInfo && markerInfo.x === marker.x && markerInfo.y === marker.y && (
                        <CustomOverlayMap position={marker.position} >
                            <StyledMapCard>
                                <Card.Body >
                                    <StyledColseBtn onClick={() => setMarkerInfo(null)}/>
                                    <Card.Title>{markerInfo.place_name}</Card.Title>
                                    <Card.Text>{markerInfo.road_address_name}</Card.Text>
                                    <Card.Text>{markerInfo.address_name}</Card.Text>
                                    {departure !== markerInfo.place_name && <StyledDirectionBtn variant="secondary" onClick={onClickChangePoint(markerInfo.place_name,'departure')}>출발지로 설정</StyledDirectionBtn>}
                                    {arrive !== markerInfo.place_name && <StyledDirectionBtn variant="secondary" onClick={onClickChangePoint(markerInfo.place_name, 'arrive')}>도착지로 설정</StyledDirectionBtn>}
                                    <Card.Link href={`https://map.kakao.com/link/to/${markerInfo.place_name},${markerInfo.y},${markerInfo.x}`} target={"_blank"} >
                                        <StyledDirectionBtn variant="success" onClick={() =>{ 
                                            console.log(markerInfo.place_name,'onClick');
                                            setArrive(markerInfo.place_name);
                                            onClickSearchDirection({arrive : markerInfo.place_name, departure : departure}, {lat : markerInfo.y, lng : markerInfo.x})}} >
                                            길찾기
                                        </StyledDirectionBtn>
                                    </Card.Link>
                                </Card.Body> 
                            </StyledMapCard>
                        </CustomOverlayMap>
                    )}
            </>
        ))}
            <Button onClick={() => setZoomable(false)}>지도 확대/축소 끄기</Button>{" "}
            <Button onClick={() => setZoomable(true)}>지도 확대/축소 켜기</Button>{" "}
            <Button onClick={() => {window.open(`https://map.kakao.com/link/to/${arrive},${markerInfo.y},${markerInfo.x}`); onClickSearchDirection({arrive, departure}, {lat : markerInfo.y, lng : markerInfo.x} )}}>길찾기</Button>
        </StyledPlanMap>
    )
}

const StyledPlanMap = styled(Map)`
    height: 500px;
`

const StyledColseBtn = styled(CloseButton)`
    position: absolute;
    top: 5px;
    right: 5px;
`

const StyledMapCard = styled(Card)`
    position: relative;
    padding: 10px 20px;
    z-index: 1;
    & > .card-body {
        height: inherit;
        & > .card-title {
        }
        & > .card-text {
            margin: 0;
        }
    }
`


export default MapSide
