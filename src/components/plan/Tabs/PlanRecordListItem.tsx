import { StyledDirectionBtn } from '../PlanMap'
import { TPlan } from '../../../atom/planRecord'
import TabModal from './TabModal';

type IRecordListItemProps = {
    plan : TPlan;
}

const RecordListItem = ({plan} : IRecordListItemProps) => {  
    return (
        <>
            <StyledDirectionBtn variant='success' disabled>{plan.title}</StyledDirectionBtn>        
            <TabModal/>  
        </>
        )
    }

export default RecordListItem
