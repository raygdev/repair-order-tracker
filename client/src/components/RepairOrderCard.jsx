/* eslint-disable no-unused-vars */
import React from 'react'
import loadable from '@loadable/component'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan, faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { toLocalDateString } from '../utils/datesHelpers'
import { useSubmit } from 'react-router-dom'
import AlertDeleteAction from './AlertDialogAction'
const Link = loadable(() => 
  import('react-router-dom').then(module => ({ default: module.Link}))
)


function RepairOrderCard({ repairOrder }) {
  const { ro_number, id, created_on, vehicle } = repairOrder
  const date = toLocalDateString(created_on)
  const submit = useSubmit()
  return (
    <li className='rounded block shadow-xl'>
      <div className='text-ro-slate-900 rounded overflow-hidden'>
          <div className='bg-ro-header text-ro-slate-100 p-3 flex justify-between'>
            <Link 
              to={`repairorder/${id}`}
              className='hover:text-ro-slate-300 hover:underline'
            >
                RO {ro_number}
            </Link>
            <div className='flex gap-6'>
              <AlertDeleteAction
                method={'post'} 
                action={`repairorder/delete/${id}`} 
                name={`Repair Order Number ${ro_number}`}
                className='hover:text-red-400 active:text-red-700'
              />
              <Link 
                aria-label='edit repair order' 
                to={`editrepairorder/${id}/`}
                className='hover:text-ro-slate-300'
              >
                <FontAwesomeIcon aria-hidden icon={faPenToSquare} />
              </Link>
            </div>
          </div>
          <div className='flex justify-between px-2 py-3'>
            <div className='flex flex-col'>
              <span className='m-3'>{vehicle?.Year || "Please"}</span>
              <span className='m-3'>{vehicle?.Make || 'Check'}</span>
              <span className='m-3'>{vehicle?.Model || "VIN"}</span>
            </div>
            <div className='flex flex-col justify-between py-2'>
              <div className='bg-green-500 flex justify-center rounded px-1'>
                completed
              </div>
              <span className='text-ro-slate-500'>{date}</span>
            </div>
          </div>
      </div>
    </li>
  )
}

export default RepairOrderCard