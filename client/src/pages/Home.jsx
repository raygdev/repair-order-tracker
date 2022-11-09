import React from 'react'
import loadable from '@loadable/component'
const Link = loadable(() => import('react-router-dom').then(module => ({default:module.Link})))

export default function Home() {
  return (
    <div className='flex flex-col m-auto bg-sky-500 h-80 p-4 rounded'>
        <main className='m-auto text-center bg-sky-400 p-4 rounded shadow-lg shadow-slate-600'>
            <h1 className='text-2xl font-extrabold'>Welcome to the RO Tracker!</h1>
            <p className='text-md font-semibold'>This is a free service without ads for auto techs by auto techs!</p>
            <div className='flex justify-evenly my-5'>
                <div className='flex flex-col items-center basis-1/4'>
                    <p>Already have an account?</p>
                    <hr className='text-slate-500'/>
                    <Link to='/login' className='text-white font-semibold underline'>Login</Link>
                </div>
                <div className='flex flex-col items-center basis-1/4'>
                    <p>Or</p>
                    <hr />
                    <Link to='/register' className='text-white font-semibold underline'>Register</Link>
                </div>
            </div>
        </main>
    </div>
  )
}
