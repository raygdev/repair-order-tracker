import React from 'react'
import { useLoaderData } from 'react-router-dom'
import RepairOrders from './RepairOrders';

export default function User(props) {
  const user = useLoaderData();
  return (
    <>
        <h1 className='font-extrabold text-2xl text-center mt-5'>Welcome {user.name.first}!</h1>
        <RepairOrders repairOrders={user.repairOrders} userId={user._id}/>
    </>
  )
}

export function userLoaderFunction({params}){
    return loadUser(params.userId).catch(e => console.log(e.message))
}

async function loadUser(userId){
    const res = await fetch(`/api/user/${userId}`)
    if(!res.ok){
        throw await res.json()
    }
    const user = await res.json()
    return user
}
