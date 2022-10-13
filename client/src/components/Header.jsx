import React from 'react'
import { Link } from 'react-router-dom'

export const Header = (props) => {
  return (
    <header className='p-4 bg-sky-500 flex'>
        <nav className='bg-sky-500 flex basis-full justify-around'>
            <Link to='login' className='text-white'>Login</Link>
            <Link to='register'className='text-white'>Register</Link>
            <Link to='about'className='text-white'>About</Link>
        </nav>
    </header>
  )
}
