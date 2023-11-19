import React from 'react'
import { IKakaoAddressInfo } from '../../../atom/kakaoAddressInfo';
import { Form , ListGroup } from 'react-bootstrap';
import { StyledCurrentPlaceDiv, StyledDirectionBtn, StyledSearchListItem, StyledeBtnWrapper } from '../../PlanMap';

export interface ICategoryTabProps {
    searchList: IKakaoAddressInfo[];
    setKeyword: (value: string) => void; 
    kakaoKewordSerach: () => void;
    onClickChangePoint: (placeName: string, type: "departure" | "arrive") => ()=> void;
    onClickSerachRecord: (addressInfo: any) => () => void; 
    departure: string; 
    arrive: string; 
}

const CategoryTab:React.FC<ICategoryTabProps> = ({  
        searchList,
        setKeyword,
        kakaoKewordSerach, 
        onClickChangePoint, 
        onClickSerachRecord,
        departure,
        arrive
    }) => {
    return (
        <>
            <Form.Control
                type="text"
                id="category_text"
                placeholder='서울역 맛집'
                onChange={(e) => setKeyword(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        kakaoKewordSerach();
                    }
                }}
            />
            <Form.Text>
                키워드 검색 예시("서울역 맛집", "인천 산책하기 좋은 곳")
            </Form.Text>
            <ListGroup as='ol' numbered>
                {searchList?.map((addressInfo: any) => 
                    <StyledSearchListItem action key={addressInfo.id} onClick={onClickSerachRecord(addressInfo)}>
                        {departure === addressInfo?.place_name && <StyledCurrentPlaceDiv background='#198754'>{addressInfo.place_name}</StyledCurrentPlaceDiv> } 
                        {arrive === addressInfo?.place_name && <StyledCurrentPlaceDiv background='#dc3545'>{addressInfo.place_name}</StyledCurrentPlaceDiv>} 
                        {arrive !== addressInfo?.place_name && departure !== addressInfo?.place_name && <StyledCurrentPlaceDiv>{addressInfo.place_name}</StyledCurrentPlaceDiv>}
                        <StyledeBtnWrapper>
                            { departure === addressInfo?.place_name && <StyledDirectionBtn variant='success' disabled>현재 출발지</StyledDirectionBtn>}
                            { arrive === addressInfo?.place_name && <StyledDirectionBtn variant='danger' disabled>현재 도착지</StyledDirectionBtn>}
                            {departure !== addressInfo?.place_name && <StyledDirectionBtn variant="secondary"    
                                onClick={onClickChangePoint(addressInfo?.place_name, 'departure')}>
                                    출발지
                            </StyledDirectionBtn>}
                            { arrive !== addressInfo?.place_name && <StyledDirectionBtn variant="danger"    
                                onClick={onClickChangePoint(addressInfo?.place_name, 'arrive')}
                                >    
                                    도착지
                            </StyledDirectionBtn>}
                        </StyledeBtnWrapper>
                    </StyledSearchListItem>
                )}
            </ListGroup>   
        </>
    )
}

export default CategoryTab
