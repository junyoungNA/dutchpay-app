import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CreateGroup from '../components/CreateGroup'
import AddMembers from '../components/AddMembers'
import ExpenseMain from '../components/ExpenseMain'
import Calendar from '../components/Calendar'
import { RecoilRoot } from 'recoil'
import { ROUTES } from './routes'
import Login from '../components/Login'
import PlanMap from '../components/PlanMap'

const Router:React.FC<{}> = () => {
    
    return (
        <BrowserRouter>
            <RecoilRoot>
                <Routes>
                    <Route path='/' element={<Login/>}/>
                    <Route path={ROUTES.CREATE_GROUP} element={<CreateGroup/>}/>
                    <Route path={ROUTES.ADD_MEMBERS} element={<AddMembers/>}/>
                    <Route path={ROUTES.EXPENSE_MAIN} element={<ExpenseMain/>}/>
                    <Route path={ROUTES.CALENDAR} element={<Calendar/>}/>
                    <Route path={ROUTES.PLAN} element={<PlanMap/>}/>
                </Routes>
            </RecoilRoot>
        </BrowserRouter>
    )
}

export default Router
