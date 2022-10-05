import React, {useEffect, useState} from 'react'
import '../css/loginForm.css'

export const Login = () => {
const [userLogin, setUserLogin] = useState({
    email: '',
    password: ''
})
const [isLoading, setIsLoading] = useState(false)
const [isSubmitted, setIsSubmitted] = useState(false)
const [error, setError] = useState('')

useEffect(() => {
    if(isLoading){
        fetch('./api/login',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(userLogin)
        }).then(res => {
            if(!res.ok){
                throw new Error('Something went wrong')
            } else {
                return res.json()
            }
        }).then(user => {
            console.log(user)
            setIsLoading(false)
            setIsSubmitted(true)
            setError('')
            setUserLogin({email:'',password:''})
            return
        }).catch(e => {
            console.log(e)
            setError(`username/password combination doesn't exist`)
            setIsLoading(false)
            return
        })
    }
},[isLoading])

function handleChange(e){
    const {name, value} = e.target;
    setUserLogin(prevUserLogin => ({
        ...prevUserLogin,
        [name]:value
    }))
}

function handleSubmit(e){
    e.preventDefault()
    setIsLoading(true)
}

const errorStyles = {
    display: error ? 'block': 'none',
    color: 'red',
    fontSize:'.75rem'
}

  return (
    <div>
        <form onSubmit={handleSubmit} action="POST">
            <h3>Please log in!</h3>
            <input type="email" 
                value={userLogin.email}
                onChange={handleChange}
                name='email'
                placeholder='enter user email'
            />
            <input type="password" 
                value={userLogin.password}
                onChange={handleChange}
                name='password'
                placeholder='enter your password'
            />
            <button>Login</button>
            <p style={errorStyles}>{error}</p>
        </form>
    </div>
  )
}
