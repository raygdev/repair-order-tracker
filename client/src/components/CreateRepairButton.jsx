import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAdd } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

export default function CreateRepairButton() {
  return (
    <div className='flex  justify-center py-5'>
        <Link to='create-repair-order' className='text-white underline font-semibold hover:text-green-300'>Add <FontAwesomeIcon icon={faAdd} /></Link>
    </div>
  )
}
