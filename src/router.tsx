// src/router/Routers.tsx

import { createBrowserRouter, Navigate, } from 'react-router-dom'
import PublicLayout from './layout/PublicLayout';
import HomePage from './pages/home/HomePage';
import AuthLayout from './layout/AuthLayout';
import Login from './pages/login/Login';
import Contact from './pages/contact/Contact';
import Root from './layout/Root';
import UsersPage from './pages/user/UsersPage';
import Tenants from './pages/tenant/Tenants';



export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [

      {
        path: '/',
        element: <AuthLayout />,
        children: [
          {
            index: true,
            element: <HomePage />,
            handle: { showBreadcrumb: true },
          },
          {
            path: '/tenants',
            element: <Tenants />,
            handle: { showBreadcrumb: true },
          },
          {
            path: '/users',
            element: <UsersPage />,
            handle: { showBreadcrumb: true },
          },
        ],
      },
      {
        path: '/auth',
        element: <PublicLayout />,
        children: [
          {
            path: 'login',
            element: <Login />,
          },
          {
            path: 'contact',
            element: <Contact />,
          },
        ],
      },
      {
        path: '*',
        element: <Navigate to="/auth/login" replace />,
      },
    ]

  }

]);


