import  {useState} from 'react'
import OverlayWrapper from '../shared/OverlayWrapper';
import { Col,ListGroup, Row, Button } from 'react-bootstrap';
import styled from 'styled-components';
import useKakaoKeywordSearch from '../../hooks/useKakaoKeywordSearch';
import MapSide from './MapSide';
import TabSide from './TabSide';

export type TMarkers  = {
    lat: string,
    lng : string,
} 

export interface IMarkers {
    position? : TMarkers;
}

export type TArriveAndDeparture = {
    arrive : string,
    departure : string,
}

export interface  IDirectionRecord {
    arriveAndDeparture : TArriveAndDeparture;
    coordinate: TMarkers; 
}

const PlanMap = () => {
    const [markers, setMarkers] = useState<IMarkers[]>([]); //키워드 검색들 마커

    // const [activeTab, setActiveTab] = useState('category');
    const [directionRecord, setDirectionRecord] = useState<IDirectionRecord[]>([]); //길찾기한 기록들
    const [departure, setDeparture] = useState(''); // 출발지
    const [arrive, setArrive] = useState(''); //도착지
    const [keyword, setKeyword] = useState('서울역');
    const [markerInfo, setMarkerInfo] = useState<any>(null); //현재 마커 정보

    const {searchList, kakaoKeywordSearch, map, setMap} = useKakaoKeywordSearch({setMarkers, markerInfo});

    const onClickSearchDirection = (arriveAndDeparture : TArriveAndDeparture, coordinate : TMarkers)=> {
        if(arrive === '' || !arrive) return;
        setDirectionRecord((prev : IDirectionRecord[]) => 
            [
                ...prev,
                {
                    arriveAndDeparture,
                    coordinate,
                }
            ]
        );
    }

    const onClickChangePoint = (placeName: string, type: "departure" | "arrive") => () => {
        // state 가 arrive면 setDeparture를 해야하고 departure면 setArrive
        if (type === "departure") {
            setDeparture(placeName);
            if (arrive === placeName) {
                setArrive('');
            }
        } 
        if (type === "arrive") {
            setArrive(placeName);
            if (departure === placeName) {
                setDeparture('');
            }
        }
    }
    return (
        <OverlayWrapper>
            <StyledPlanRow padding={'auto'}>
                {/* 맵부분 */}
                <StyledPlanCol xs={12} lg={6}>
                    <MapSide 
                        setMap={setMap} 
                        markers={markers} 
                        markerInfo={markerInfo} 
                        setMarkerInfo={setMarkerInfo}  
                        onClickChangePoint={onClickChangePoint} 
                        onClickSearchDirection={onClickSearchDirection} 
                        departure={departure} 
                        arrive={arrive}
                        />
                    {departure && <div> 출발지 : {departure}</div>}
                    {arrive && <div> 도착지 : {arrive}</div>}
                </StyledPlanCol>
                {/* 검색 탭 부분 */}
                <StyledPlanCol xs={12}  lg={4}>
                    <TabSide 
                        searchList={searchList}
                        setKeyword={setKeyword}
                        kakaoKeywordSearch={kakaoKeywordSearch}
                        onClickChangePoint={onClickChangePoint}
                        departure={departure}
                        arrive={arrive}
                        setDeparture={setDeparture}
                        setArrive={setArrive}
                        directionRecord={directionRecord}
                        setMarkers={setMarkers}
                        map={map}
                        setMarkerInfo={setMarkerInfo}
                    />
                </StyledPlanCol>
            </StyledPlanRow>
        </OverlayWrapper>
    );
}

const StyledPlanRow = styled(Row)`
    display: flex;
    justify-content: center;
    padding: 0;
`

const StyledPlanCol = styled(Col)`
    margin: 30px;
`

export const StyledSearchListItem = styled(ListGroup.Item)`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

export const StyledeBtnWrapper = styled.div`
    display: flex;
    gap: 10px; 
`
export const StyledDirectionBtn = styled(Button)<{width?:string}>`
    padding: 5px;
    font-size: 12px;
    margin-right:10px;
    margin-top: 5px;
    width: ${({width}) => width};
`

export const StyledCurrentPlaceDiv = styled.div<{ background?: string, }>`
    background: ${props =>
        props?.background ? props.background : 'white'};
    color: ${props =>
        props?.background ? 'white' : 'black'};;
    padding: 5px 10px;
    border-radius: 30px;
`

export default PlanMap
