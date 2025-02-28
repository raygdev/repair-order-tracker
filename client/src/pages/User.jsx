import React, { useEffect } from 'react'
import { useRouteLoaderData } from 'react-router-dom'
import loadable from '@loadable/component';
import { useAuth } from '../hooks/useAuth';
const RepairOrders = loadable(() => import('@components/RepairOrders'))

export default function User(props) {
  const { user }  = useAuth()

  useEffect(()=> {
    document.title = "Dashboard"
  },[])

  const repairOrders = useRouteLoaderData('root');
  return (
    <>
        <h1 className='font-extrabold text-2xl text-center mt-5'>Welcome {user.firstName}!</h1>
        <RepairOrders repairOrders={repairOrders} />
    </>
  )
}