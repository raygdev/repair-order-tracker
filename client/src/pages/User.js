import React, { useEffect } from 'react'
import { useRouteLoaderData } from 'react-router-dom'
import loadable from '@loadable/component';
const RepairOrders = loadable(() => import('../components/RepairOrders'))

export default function User(props) {
  useEffect(()=> {
    document.title = "User Dashboard"
  },[])

  const user = useRouteLoaderData('root');
  return (
    <>
        <h1 className='font-extrabold text-2xl text-center mt-5'>Welcome {user.name.first}!</h1>
        <RepairOrders repairOrders={user.repairOrders} userId={user._id}/>
    </>
  )
}