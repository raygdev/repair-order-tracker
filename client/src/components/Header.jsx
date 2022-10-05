import React from 'react'
import { Link } from 'react-router-dom'
import '../css/header.css'
export const Header = (props) => {
  return (
    <header>
        <nav>
            <Link to='login'>Login</Link>
            <Link to='register'>Register</Link>
            <Link to='about'>About</Link>
        </nav>
    </header>
  )
}
