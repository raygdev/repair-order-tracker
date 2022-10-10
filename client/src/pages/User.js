import React from 'react'
import { useLoaderData } from 'react-router-dom'

export default function User(props) {
  const user = useLoaderData()
  console.log(user)
  return (
    <div>
        <h1>Welcome {user.name.first}!</h1>
    </div>
  )
}

export function userLoaderFunction({request,params}){
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
