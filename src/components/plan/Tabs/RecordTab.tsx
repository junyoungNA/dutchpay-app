import React from 'react'
import { IDirectionRecord, StyledDirectionBtn, StyledSearchListItem } from '../PlanMap'
import { ButtonGroup, ListGroup } from 'react-bootstrap'
import { ArrowRight } from 'react-bootstrap-icons'
import styled from 'styled-components';
import Lottie from 'lottie-react';
import { error_animation } from '../../../aseets';

export interface IRecordTabProps {
    directionRecord : IDirectionRecord[],
    onClickRecordPlan : (departure: string, arrive: string) => (event : React.MouseEvent<HTMLButtonElement>) => void;

}

const RecordTab: React.FC<IRecordTabProps> = ({directionRecord, onClickRecordPlan}) => {
    return (
        <>
            {directionRecord.length === 0 && <><StyledErrorMsg>길찾기 기록이 없어요ㅠ</StyledErrorMsg><Lottie animationData={error_animation}  loop={false}/></>}
            <ListGroup as='ol' numbered>
                {directionRecord?.map((record : IDirectionRecord, idx: number) => 
                    <StyledSearchListItem action key={idx} onClick={() => window.open(`https://map.kakao.com/?sName=${record.departure}&eName=${record.arrive}`)}>
                        {record.departure !== '' ?
                            <ButtonGroup >
                                <StyledDirectionBtn variant='success' disabled width={'25%'}>{record.departure}</StyledDirectionBtn>
                                <ArrowRight size={32}/>
                                <StyledDirectionBtn variant='danger' disabled  width={'25%'}>{record.arrive}</StyledDirectionBtn>
                                <StyledDirectionBtn  onClick={onClickRecordPlan(record.departure, record.arrive)}>설정</StyledDirectionBtn>
                            </ButtonGroup> 
                            :
                            <ButtonGroup>
                                <StyledDirectionBtn variant='danger' disabled width={'50%'} style={{margin:'auto'}}>{record.arrive}</StyledDirectionBtn>
                                <StyledDirectionBtn  onClick={onClickRecordPlan(record.departure, record.arrive)}>설정</StyledDirectionBtn>
                            </ButtonGroup>
                            
                        }
                    </StyledSearchListItem >
                )}
            </ListGroup>
        </>
    )
}

export default RecordTab


const StyledErrorMsg = styled.h4`
    text-align: center;
`
