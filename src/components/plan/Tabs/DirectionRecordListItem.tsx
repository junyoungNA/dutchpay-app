import React from 'react'
import { StyledDirectionBtn, TArriveAndDeparture } from '../PlanMap'
import { ArrowRight } from 'react-bootstrap-icons'

interface IDirectionRecordListItemProps {
    arriveAndDeparture : TArriveAndDeparture,
    onClickRecordPlan : (departure : string, arrive : string) => (event : React.MouseEvent<HTMLButtonElement>) => void,
}

const RecordListItem:React.FC<IDirectionRecordListItemProps> = ({arriveAndDeparture , onClickRecordPlan}) => {
    const {arrive, departure} = arriveAndDeparture;
    return (
        departure !== '' ?
            <>
                <StyledDirectionBtn variant='success' disabled>{departure}</StyledDirectionBtn>
                <ArrowRight size={32}/>
                <StyledDirectionBtn variant='danger' disabled >{arrive}</StyledDirectionBtn>
                <StyledDirectionBtn  onClick={onClickRecordPlan(departure, arrive,)}>설정</StyledDirectionBtn>
            </> 
        :
            <>
                <StyledDirectionBtn variant='danger' disabled  style={{margin:'auto'}}>{arrive}</StyledDirectionBtn>
                <StyledDirectionBtn  onClick={onClickRecordPlan(departure, arrive,)}>설정</StyledDirectionBtn>
            </>
        )
    }

export default RecordListItem
