import React from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Header(props) {
 const location = useLocation()

  return (
    <header className='p-4 bg-sky-700 flex sticky top-0 min-w-max text-white font-semibold'>
        <nav className='flex basis-full justify-around'>
            <Link to='/' className={`p-4 ${location.pathname === '/' ? 'underline underline-offset-4' : ''}`}>Home</Link>
            <Link to='login' className={`p-4 ${location.pathname === '/login' ? 'underline underline-offset-4' : ''}`}>Login</Link>
            <Link to='register'className={`p-4 ${location.pathname === '/register' ? 'underline underline-offset-4' : ''}`}>Register</Link>
            <Link to='about'className={`p-4 ${location.pathname === '/about' ? 'underline underline-offset-4' : ''}`}>About</Link>
        </nav>
    </header>
  )
}
