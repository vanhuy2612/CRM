import React, {lazy} from 'react'
import { Redirect } from 'react-router'

const Example = lazy(() => import('Views/Main'))
const Login = lazy(() => import('Views/Login'))
const Register = lazy(() => import('Views/Register'))

const routes = [
    {
        path: "/",
        component: () => <Redirect to="/create-order" />,
        exact: true,
        name: 'dashboard'
    },
    {
        path: "/example",
        name: 'example',
        component: () => <Example />,
        exact: true,
        sidebarName: 'example'
    },
    {
        path: "/login",
        name: 'login',
        component: () => <Login />,
        exact: true,
        sidebarName: 'Login'
    },
    {
        path: "/register",
        name: 'register',
        component: () => <Register />,
        exact: true,
        sidebarName: 'Register'
    },
]

export default routes