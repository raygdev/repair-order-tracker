import React from 'react'
import loadable from '@loadable/component'
import highlightsData from '@utils/highlightsData'
const Link = loadable(() => import('react-router-dom').then(module => ({default:module.Link})))
const FontAwesomeIcon = loadable(() => import('@fortawesome/react-fontawesome').then(module => ({default: module.FontAwesomeIcon})))

export default function Home() {
  return (
    <>
        <main className='min-h-screen w-full flex flex-col justify-center tracking-widest text-center'>
            <div className='w-3/4 text-center self-center'>
                <h1 className='md:text-5xl uppercase py-8 font-extrabold text-2xl'>Welcome to the RO Tracker!</h1>
                <p className='md:text-lg text-sm font-semibold uppercase'>This is a free service without ads for auto techs by auto techs!</p>
            </div>
            <div className=' flex flex-col justify-center items-center basis-1/4 my-5 gap-2'>
                <p className='py-3 '>Already have an <span className='font-bold'>account</span>?</p>
                <div className='flex flex-col px-8 gap-3 font-bold'>
                    <Link to='/login' className='text-white px-8 py-1 bg-sky-700 rounded shadow-md hover:bg-sky-900  active:bg-sky-500 focus:outline-none focus:ring-4 focus:ring-sky-400 transition-all' data-testid='home-login'>Login</Link>
                    <p>OR</p>
                    <Link to='/register' className='text-white px-5 py-1 bg-sky-700 rounded shadow-md hover:bg-sky-900 active:bg-sky-500 focus:outline-none focus:ring-4 focus:ring-sky-400 transition-all'>Register</Link>
                </div>
            </div>
           
        </main>
        <section className=' my-5 p-4 w-full min-h-screen grid gap-y-4 gap-x-8  xs:grid-cols-2 md:grid-cols-3 text-center justify-center'>
           {highlightsData.map(highlights => {
                const  {id, icon, highlight} = highlights
                return (
                    <div key={id} className='rounded p-4 flex flex-col justify-evenly gap-8 shadow-slate-300 shadow '>
                        < FontAwesomeIcon className='text-4xl text-violet-500' icon={icon}/>
                        <p>{highlight}</p>
                    </div>
                )
           }) }
        </section>

        <section className=''>

        </section>
    </>
  )
}
