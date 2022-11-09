import React from 'react'
import { faAdd } from '@fortawesome/free-solid-svg-icons'
import loadable from '@loadable/component'
const Link = loadable(() => import('react-router-dom').then(module => ({default:module.Link})))
const FontAwesomeIcon = loadable(() => import('@fortawesome/react-fontawesome').then(module => ({default:module.FontAwesomeIcon})))

export default function AddRepairButton() {
  return (
    <div className='flex  justify-center py-5'>
        <Link to='create-repair-order' className='text-white underline font-semibold hover:text-green-300'>Add <FontAwesomeIcon icon={faAdd} /></Link>
    </div>
  )
}