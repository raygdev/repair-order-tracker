import React from 'react'
import loadable from '@loadable/component'
const Link = loadable(() => import('react-router-dom').then(module => ({default:module.Link})))

export default function Home() {
  return (
        <main className='min-h-screen w-full flex flex-col justify-center tracking-widest text-center bg-gradient-to-br from-blue-500 via-sky-300 p-10 shadow-lg shadow-slate-600'>
            <div className='w-3/4 text-center self-center'>
                <h1 className='md:text-5xl uppercase py-8 font-extrabold text-2xl'>Welcome to the RO Tracker!</h1>
                <p className='md:text-lg text-sm font-semibold uppercase'>This is a free service without ads for auto techs by auto techs!</p>
            </div>
            <div className=' flex flex-col justify-center items-center basis-1/4 my-5  xs:flex-row'>

                <div className='flex flex-col py-8 items-center justify-between'>
                    <p className='py-3 '>Already have an <span className='font-bold'>account</span>?</p>
                    <hr className='text-slate-500'/>
                    <Link to='/login' className='text-white font-semibold inline-block px-4 py-1 bg-sky-700 rounded shadow-md hover:bg-sky-900  active:bg-sky-500 focus:outline-none focus:ring-4 focus:ring-sky-400 transition-all' data-testid='home-login'>Login</Link>
                </div>

                <div className='flex flex-col justify-between px-8 items-center'>
                    <p className='py-3'><span className='font-bold'>Or</span></p>
                    <Link to='/register' className='text-white justify-end font-semibold inline-block px-4 py-1 bg-sky-700 rounded shadow-md hover:bg-sky-900 active:bg-sky-500 focus:outline-none focus:ring-4 focus:ring-sky-400 transition-all'>Register</Link>
                </div>
            </div>
            <section className='w-full bg-green-300 px-5 py-6 mt-10  grid grid-rows-2 grid-flow-col items-center justify-center'>
                <div className='col-start-1 col-span-2'>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto ullam ex itaque debitis aspernatur molestias, quisquam adipisci quam natus tempora.</p>
                </div>
                <div className='col-span-1'>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis autem enim eligendi? Quae, quas illo? Cum officia doloremque voluptatum, voluptas delectus adipisci debitis quis recusandae culpa reiciendis veniam omnis blanditiis.</p>
                </div>
            </section>
            <section className=''>

            </section>
        </main>
  )
}
