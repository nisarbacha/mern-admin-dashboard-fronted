import React from 'react'
import { useAuthStore } from '../store'
import { Navigate, Outlet, useLocation, } from 'react-router-dom'

const PublicLayout = () => {
    const location = useLocation()
    const { user } = useAuthStore()
    if (user !== null) {
        const returnTo = new URLSearchParams(location.search).get('returnTo') || '/'
        return <Navigate to={returnTo} replace={true} />
    }
    return (
        <>
            <div>Public Layout</div>
            <Outlet />
        </>
    )
}

export default PublicLayout