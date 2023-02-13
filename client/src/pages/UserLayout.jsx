import React, { useContext } from 'react'
import { redirect } from 'react-router-dom'
import loadable from '@loadable/component'
import { AuthContext } from '../provider/useAuthProvider'
const Outlet = loadable(() => import('react-router-dom').then(module => ({default:module.Outlet})))

export default function UserLayout() {
  const auth =  useContext(AuthContext)
  
  const page = (
    <div>
        <Outlet />
    </div>
  )

  return auth.token ? page : redirect('/login')
}
