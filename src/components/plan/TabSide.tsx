import MakePlanTab, { IMakePlanTabProps } from './Tabs/MakePlanTab'
import DirectionRecordTab, { IDirectionRecordTabProps } from './Tabs/DirectionRecordTab'
import DaumPostcodeEmbed from 'react-daum-postcode'
import CategoryTab, { ICategoryTabProps } from './Tabs/CategoryTab'
import { Tab, Tabs } from 'react-bootstrap'
import { Dispatch, SetStateAction, useState } from 'react'
import { IKakaoAddressInfo, kakaoAddressInfoState } from '../../atom/kakaoAddressInfo'
import { IDirectionRecord, IMarkers } from './PlanMap'
import axios from 'axios'
import { useSetRecoilState } from 'recoil'
import { mapArrive } from '../../atom/mapArrive'
import { mapDeparture } from '../../atom/mapDeparture'
import Calendar from '../calendar/Calendar'
import PlanRecordTab from './Tabs/PlanRecordTab'

const TabCategoryList = [
    {
        eventKey :'category',
        title : '카테고리 검색',
        component: ({
            searchList, 
            setKeyword, 
            kakaoKeywordSearch, 
            onClickChangePoint,
            onClickSerachRecord,
            map,
            } : ICategoryTabProps) => (
            <CategoryTab
                searchList={searchList}
                setKeyword={setKeyword}
                kakaoKeywordSearch={kakaoKeywordSearch}
                onClickChangePoint={onClickChangePoint}
                onClickSerachRecord={onClickSerachRecord}
                map={map}
            />
        ),
    },
    {
        eventKey :'location',
        title : '장소 검색',
        component : ({handleKakaoAddressSearch} :{ handleKakaoAddressSearch: (data: any) => void }) => (
            <DaumPostcodeEmbed 
                onComplete ={handleKakaoAddressSearch} 
                autoClose={false}  
                style={{height:'500px'}}/>
        )
    },
    {
        eventKey :'directionRecord',
        title : '길찾기 기록',
        component : ({
            directionRecord,
            onClickDirectionRecord
        } : IDirectionRecordTabProps) => 
        (
            <DirectionRecordTab
                directionRecord= {directionRecord}
                onClickDirectionRecord = {onClickDirectionRecord}
            />
        ),
    },
    {
        eventKey :'makePlan',
        title : '계획 작성',
        component : ({
            handleTabSelect
        } : IMakePlanTabProps) =>  
        (
            <MakePlanTab
                handleTabSelect={handleTabSelect}
            />
        )
    },
    {
        eventKey :'planRecord',
        title : '계획',
        component : ( ) =>  
        (
            <PlanRecordTab/>
        )
    },
    {
        eventKey :'calendar',
        title : '캘린더',
        component : ( ) =>  
        (
            <Calendar/>
        )
    }
]

interface ITabSideProps {
    searchList : IKakaoAddressInfo[],
    setKeyword : Dispatch<SetStateAction<string>>,
    kakaoKeywordSearch : (keyword : string) => void,
    onClickChangePoint : (placeName: string, type: "departure" | "arrive") => () => void,
    directionRecord : IDirectionRecord[]    
    setMarkers : Dispatch<SetStateAction<IMarkers[]>>,
    map : any,
    setMarkerInfo : Dispatch<SetStateAction<any>>,
}

const TabSide : React.FC<ITabSideProps> = ({
        searchList, 
        setKeyword, 
        kakaoKeywordSearch, 
        onClickChangePoint, 
        directionRecord,
        setMarkers,
        map,
        setMarkerInfo,
    }) => {
    const setAddressInfo = useSetRecoilState(kakaoAddressInfoState);
    // useReducer로 뺄 수 있을듯
    const [activeTab, setActiveTab] = useState('category');
    const setArrive = useSetRecoilState(mapArrive);
    const setDeparture = useSetRecoilState(mapDeparture);

    const handleKakaoAddressSearch = async (data: any) => {
        const searchTxt = data.address; // 검색한 주소
        const config = { headers: {Authorization : `KakaoAK ${process.env.REACT_APP_KAKAOREST_KEY}`}}; // 헤더 설정
        const url = 'https://dapi.kakao.com/v2/local/search/address.json?query='+searchTxt; // REST API url에 data.address값 전송
        await axios.get(url, config).then(async function(result : any) { // API호출
            if(result.data !== undefined || result.data !== null) {
                if(result.data.documents[0].x && result.data.documents[0].y) {
                      // Kakao Local API로 검색한 주소 정보 및 위도, 경도값 저장 
                    const bounds = new kakao.maps.LatLngBounds();
                    const markers : any= [];
                    const addressInfo = {
                        place_name: result.data.documents[0].address.address_name,
                        // address_name: result.data.documents[0].address.address_name,
                        road_address_name :result.data.documents[0].road_address.address_name,
                        // region_2depth_name: result.data.documents[0].address.region_2depth_name,
                        y: Number(result.data.documents[0].y),//위도
                        x: Number(result.data.documents[0].x),
                        position : {lat : Number(result.data.documents[0].y), lng: Number(result.data.documents[0].x)},
                    };
                        bounds.extend(new kakao.maps.LatLng(result.data.documents[0].y, result.data.documents[0].x))
                        markers.push(addressInfo);
                        setMarkers(markers);
                        setAddressInfo(addressInfo);
                        map.setBounds(bounds);
                    }
                }
        }).catch((error : any) => {
            console.log(error)
        });
    };
    
    const onClickSerachRecord = (addressInfo : IKakaoAddressInfo)  => () => {
        setAddressInfo(addressInfo);
        setMarkerInfo(addressInfo);
    }

    // 지난 기록에서 설정을 눌러 출발지, 도착지 설정
    const onClickDirectionRecord = (departure : string, arrive : string) => (event : React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        setDeparture(departure);
        setArrive(arrive);
    }

    // useReducer나 전역상태로 뺄수있을듯?
    const handleTabSelect = (eventKey: string | null) => {
        //카테고리 선택시 실행될 함수 
        //location 에서 category이동시에 이전에 검색됐던 내용들을 다시 마커설정
        if(eventKey === 'category' && searchList.length > 0) {
            const bounds = new kakao.maps.LatLngBounds();
            const markers : IMarkers[] = searchList.map( (item : any) =>  {
                bounds.extend(new kakao.maps.LatLng(item.y, item.x));
                return {
                    ...item,
                    position: {
                        lat: item.y,
                        lng: item.x,
                    }
                }})
                setMarkers(markers);
                map.setBounds(bounds);
        }
        if(eventKey) {
            setActiveTab(eventKey);
        }
    }

    return (
        <Tabs
            defaultActiveKey="category"
            onSelect={handleTabSelect} 
            activeKey={activeTab}
            className="mb-3"
            >
            {/*  TabCategoryList map을 돌면 각각 탭 컴포넌트 return*/}
            {TabCategoryList.map(({eventKey, title, component}, idx) => (
                <Tab key={idx} eventKey={eventKey} title={title} >
                    {component({
                        searchList,
                        setKeyword,
                        kakaoKeywordSearch,
                        onClickChangePoint,
                        onClickSerachRecord,
                        handleKakaoAddressSearch,
                        directionRecord,
                        onClickDirectionRecord,
                        handleTabSelect,
                        map
                    })}
                </Tab>
            ))}
        </Tabs>
    )
}

export default TabSide
