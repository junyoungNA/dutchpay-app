import React from 'react'
import { IDirectionRecord, StyledSearchListItem } from '../PlanMap'
import { ListGroup } from 'react-bootstrap'
import styled from 'styled-components';
import Lottie from 'lottie-react';
import { error_animation } from '../../../aseets';
import RecordListItem from './RecordListItem';

export interface IRecordTabProps {
    directionRecord : IDirectionRecord[],
    onClickRecordPlan : (departure: string, arrive: string) => (event : React.MouseEvent<HTMLButtonElement>) => void;
}

const RecordTab: React.FC<IRecordTabProps> = ({directionRecord, onClickRecordPlan}) => {
    console.log(directionRecord,'recordTab');
    return (
        <>
            {directionRecord.length === 0 && <><StyledErrorMsg>길찾기 기록이 없어요ㅠ</StyledErrorMsg><Lottie animationData={error_animation}  loop={false}/></>}
            <ListGroup as='ol' numbered>
                {directionRecord?.map(({arriveAndDeparture, coordinate} : IDirectionRecord, idx: number) => 
                    <StyledSearchListItem action key={idx} onClick={() => window.open(`https://map.kakao.com/link/to/${arriveAndDeparture.arrive},${coordinate.lat},${coordinate.lng}`)}>
                        <RecordListItem onClickRecordPlan={onClickRecordPlan} arriveAndDeparture={arriveAndDeparture}/>
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
