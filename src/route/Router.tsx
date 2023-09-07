import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import CreateGroup from '../components/CreateGroup'
import AddMembers from '../components/AddMembers'
import ExpenseMain from '../components/ExpenseMain'
import { RecoilRoot } from 'recoil'
import { ROUTES } from './routes'
import Login from '../components/Login'


const Router:React.FC<{}> = () => {
    
    return (
        <BrowserRouter>
            <RecoilRoot>
                <Routes>
                    <Route path='/' element={<Login/>}/>
                    <Route path={ROUTES.CREATE_GROUP} element={<CreateGroup/>}/>
                    <Route path={ROUTES.ADD_MEMBERS} element={<AddMembers/>}/>
                    <Route path={ROUTES.EXPENSE_MAIN} element={<ExpenseMain/>}/>
                </Routes>
            </RecoilRoot>
        </BrowserRouter>
    )
}

export default Router
