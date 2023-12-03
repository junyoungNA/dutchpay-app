import { StyledDirectionBtn } from '../PlanMap'
import { ArrowRight } from 'react-bootstrap-icons'
import { TPlan } from '../../../atom/planRecord'
import TabModal from './TabModal';

type IRecordListItemProps = {
    plan : TPlan;
}

const RecordListItem = ({plan} : IRecordListItemProps) => {  
    return (
        <>
            <StyledDirectionBtn variant='success' disabled>{plan.departure}</StyledDirectionBtn>
            <ArrowRight size={32}/>
            <StyledDirectionBtn variant='danger' disabled >{plan.arrive}</StyledDirectionBtn>
            <TabModal/>  
        </>
        )
    }

export default RecordListItem
