import React, {useEffect, useState} from 'react'
import '../css/loginForm.css'
import { Form, redirect } from 'react-router-dom'

export const Login = () => {

  return (
    <>
        <Form className='login-form' action='../login' method="POST">
            <h3>Please log in!</h3>
            <input type="email" 
                name='email'
                placeholder='enter user email'
            />
            <input type="password" 
                name='password'
                placeholder='enter your password'
            />
            <button type='submit'>Login</button>
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
            throw ('Something went wrong')
    }
    const user = await res.json()
    console.log(user._id)
    return redirect(`/user/${user._id}`)
}