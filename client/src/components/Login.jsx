import React, {useEffect, useState} from 'react'

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
        fetch('./api/lgoin',{
            method:'POST',
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
            setIsSubmitted(false)
            setUserLogin({email:'',password:''})
        }).catch(e => {
            console.log(e)
            setError(e)
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
                value=''
                onChange={handleChange}
                name='email'
                placeholder='enter user email'
            />
            <input type="password" 
                value=''
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
