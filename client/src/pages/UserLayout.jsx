import React from 'react'
import loadable from '@loadable/component'
import { Navigate } from 'react-router-dom'
import { useAuth } from '@hooks/useAuth'
const Outlet = loadable(() => import('react-router-dom').then(module => ({default:module.Outlet})))

export default function UserLayout() {
  const  auth  =  useAuth()
  const page = (
    <div>
        <Outlet />
    </div>
  )

  return auth.isAuth ? page : <Navigate to={'/login'} />
}
