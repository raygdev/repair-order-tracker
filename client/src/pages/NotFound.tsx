import React from 'react'
import loadable from '@loadable/component'
import { useLocation, useRouteError } from 'react-router'
import { faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons'
const Link = loadable(() => import('react-router-dom').then(module => ({default:module.Link})))
const Header = loadable(() => import('../components/Header'))
const Icon = loadable(() => import('@fortawesome/react-fontawesome').then(module => ({default:module.FontAwesomeIcon})))
export default function NotFound() {
  const error = useRouteError() as any
  const location = useLocation()
  return (
    <div className='min-h-screen'>
    <Header />
      <main className='p-4  flex flex-col w-screen'>
        <h1 className='text-5xl font-extrabold mb-4'>Whoops! Something went wrong!</h1>
        {
          error && error instanceof Error ? (
          <div className='flex flex-col gap-10 min-h-full'>
            <h2 className='text-4xl font-bold'>{error.message}</h2>
            <p className='text-1xl font-semibold'>{error.stack}</p>
          </div>
          ): (
            <div className='flex flex-col gap-7 p-5'>
              <h2 className='text-4xl font-bold'>Status: {error.status}</h2>
              <p className='text-xl font-semibold'>{error.statusText}</p>
              <p className='text-xl font-semibold'>{error.message}</p>
            </div>
          )
        }
        <Link 
          to={location.pathname}
          className='text-xl flex items-center gap-2 text-white font-semibold self-center bg-sky-800 transition-all hover:bg-sky-400 hover:text-inherit px-2 py-1 rounded-sm shadow-slate-400 shadow-lg active:shadow-md'
        ><Icon icon={faCircleArrowLeft}/>Go Back
        </Link>
      </main>
    </div>
  )
}
