import React from 'react'
import { Form, redirect } from 'react-router-dom'

export const Login = () => {

  return (
    <>
        <Form className='rounded bg-sky-500 flex flex-col m-auto h-60 p-4 justify-evenly shadow-lg shadow-slate-500' action='../login' method="POST">
            <h3 className='text-lg text-white font-bold self-center'>Please log in!</h3>
            <input 
                className='p-1 rounded'
                type="email" 
                name='email'
                placeholder='enter user email'
            />
            <input 
                className='p-1 rounded'
                type="password" 
                name='password'
                placeholder='enter your password'
            />
            <button className='text-white bg-sky-700 self-center px-2 py-1 rounded' type='submit'>Login</button>
        </Form>
    </>
  )
}

export async function loginLoader({request,params}){
    console.log(request)
    return 'some email'
}

export async function loginActionData({request}){
    const formData = await request.formData()
    const userObj = Object.fromEntries(formData)
    return verifyUser(userObj).catch(e => console.log(e))
}

async function verifyUser(userObject){
    const res = await fetch('/api/login',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(userObject)
    })

    if(!res.ok){
        console.log(res.status)
            throw new Error('Something went wrong')
    }
    const user = await res.json()
    console.log(user._id)
    return redirect(`/user/${user._id}`)
}