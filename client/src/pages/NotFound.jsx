import React from 'react'
import { useLocation, Link } from 'react-router-dom'
import { Header } from '../components/Header'
export default function NotFound() {
  const location = useLocation()
  console.log(location)
  return (
    <div className='h-screen flex flex-col'>
    <Header />
      <main className='p-4 text-white flex flex-col justify-around items-center h-80 bg-sky-500 w-screen m-auto'>
        <h1 className='text-2xl font-extrabold self-center'>Looks like we Could't find that recource!</h1>
        <Link to='/' className='underline text-xl font-bold'>Go Home</Link>
      </main>
    </div>
  )
}
