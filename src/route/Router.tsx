import { BrowserRouter, Routes, Route, createBrowserRouter } from 'react-router-dom'
import CreateGroup from '../components/CreateGroup'
import AddMembers from '../components/AddMembers'
import ExpenseMain from '../components/ExpenseMain'
import Calendar from '../components/Calendar'
import { Router as RemixRouter } from '@remix-run/router/dist/router'
import { ROUTES } from './routes'
import Login from '../components/Login'
import PlanMap from '../components/PlanMap'
import GeneralLayout from '../layout/Generallayout'

interface RouterElement {
    id: number // 페이지 아이디 (반복문용 고유값)
    path: string // 페이지 경로
    label: string // 사이드바에 표시할 페이지 이름
    element: React.ReactNode // 페이지 엘리먼트
    withAuth?: boolean // 인증이 필요한 페이지 여부
}

const routerData: RouterElement[] = [
    // TODO 3-1: 로그인 페이지 라우터 등록하기 ('login', withAuth: false)
    // TODO 3-2: page a, b, c 등록하기
    {
        id: 0,
        path: '/',
        label: 'Home',
        element: <Login />,
        withAuth: false,
    },
    {
        id: 1,
        path: ROUTES.CREATE_GROUP,
        label: 'CreateGroup',
        element: <CreateGroup />,
        withAuth: true,
    },
    {
        id: 2,
        path: ROUTES.ADD_MEMBERS,
        label: 'AddMembers',
        element: <AddMembers />,
        withAuth: true,
    },
    {
        id: 3,
        path: ROUTES.EXPENSE_MAIN,
        label: 'Expense',
        element: <ExpenseMain />,
        withAuth: true,
    },
    {
        id: 4,
        path: ROUTES.CALENDAR,
        label: 'Calendar',
        element: <Calendar />,
        withAuth: false,
    },
    {
        id: 4,
        path: ROUTES.PLAN,
        label: 'PlanMap',
        element: <PlanMap />,
        withAuth: false,
    }
];

// GeneralLayou에는 페이지 컴포넌트를 children으로 전달
export const routers: RemixRouter = createBrowserRouter(
    routerData.map((router : RouterElement) => {
        if(router.withAuth) {
            return {
                path: router.path,
                element :<GeneralLayout>{router.element}</GeneralLayout>
            }
        } else {
            return {
                path : router.path,
                element:router.element
            }
        }
    })
)

// const Router:React.FC<{}> = () => {
//     return (
//         <BrowserRouter>
//             <RecoilRoot>
//                 <Routes>
//                     <Route path='/' element={<Login/>}/>
//                     <Route path={ROUTES.CREATE_GROUP} element={<CreateGroup/>}/>
//                     <Route path={ROUTES.ADD_MEMBERS} element={<AddMembers/>}/>
//                     <Route path={ROUTES.EXPENSE_MAIN} element={<ExpenseMain/>}/>
//                     <Route path={ROUTES.CALENDAR} element={<Calendar/>}/>
//                     <Route path={ROUTES.PLAN} element={<PlanMap/>}/>
//                 </Routes>
//             </RecoilRoot>
//         </BrowserRouter>
//     )
// }

// export default Router
