import { StyledDirectionBtn } from '../PlanMap'
import { ArrowRight } from 'react-bootstrap-icons'
import { TPlan } from '../../../atom/planRecord'
import TabModal from './TabModal';
import { useRecoilValue } from 'recoil';
import { useEffect } from 'react';

type IRecordListItemProps = {
    plan : TPlan;
}

const RecordListItem = ({plan} : IRecordListItemProps) => {  
    return (
        <>
            <StyledDirectionBtn variant='success' disabled>{plan.usersData.departure}</StyledDirectionBtn>
            <ArrowRight size={32}/>
            <StyledDirectionBtn variant='danger' disabled >{plan.usersData.arrive}</StyledDirectionBtn>
            <TabModal/>  
        </>
        )
    }

export default RecordListItem
