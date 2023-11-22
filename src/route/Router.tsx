import {createBrowserRouter } from 'react-router-dom'
import CreateGroup from '../components/dutchpay/CreateGroup'
import AddMembers from '../components/dutchpay/AddMembers'
import ExpenseMain from '../components/dutchpay/ExpenseMain'
import Calendar from '../components/calendar/Calendar'
import { Router as RemixRouter } from '@remix-run/router/dist/router'
import { ROUTES } from './routes'
import PlanMap from '../components/PlanMap'
import AuthChecklayout from '../layout/AuthChecklayout'
import Dutchpay from '../components/dutchpay/Dutchpay'
import MainContainer from '../components/MainContainer'

interface RouterElement {
    id: number // 페이지 아이디 (반복문용 고유값)
    path: string // 페이지 경로
    label: string // 사이드바에 표시할 페이지 이름
    element: React.ReactNode // 페이지 엘리먼트
    withAuth?: boolean // 인증이 필요한 페이지 여부
}

const routerData: RouterElement[] = [
    // TODO 3-1: 로그인 페이지 라우터 등록하기 ('login', withAuth: false)
    {
        id: 0,
        path: '/',
        label: 'Home',
        element: <MainContainer />,
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
        path: ROUTES.DUTCHPAY,
        label: 'Dutchpay',
        element: <Dutchpay />,
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
        id: 5,
        path: ROUTES.PLAN,
        label: 'PlanMap',
        element: <PlanMap />,
        withAuth: true,
    }
];

// GeneralLayou에는 페이지 컴포넌트를 children으로 전달
export const routers: RemixRouter = createBrowserRouter(
    routerData.map((router : RouterElement) => {
        if(router.withAuth) {
            return {
                path: router.path,
                element :<AuthChecklayout>{router.element}</AuthChecklayout>
            }
        } else {
            return {
                path : router.path,
                element:router.element
            }
        }
    })
)
