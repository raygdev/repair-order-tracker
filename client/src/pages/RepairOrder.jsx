import React from 'react'
import { useRouteLoaderData, useParams, Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import DeleteButton from '../components/DeleteButton'

//TODO pretty up the UI

export default function RepairOrder() {

    const { repairOrders } = useRouteLoaderData('root')
    const { repairId, userId } = useParams()

    const [repairOrder ] = repairOrders.filter(RO => RO._id === repairId)

    let date = new Date(repairOrder.created_on).toLocaleDateString()

  return (
    <main className='flex flex-col bg-sky-500 items-center text-white p-4 mx-auto mt-5 md:w-3/4 lg:w-2/4'>
        <div className='flex justify-between w-96 p-4'>
            <p title='repair order number' className=''>Repair Order # {repairOrder.ro_number}</p>
            <p title='repair order creation date' date={date} className=''>Created On {date}</p>
        </div>
        <p title='vehicle vin number'>VIN # {repairOrder.vin}</p>
        <p title='pay type' className='whitespace-pre-wrap'>Pay Type: {repairOrder.isWarranty ? "Warranty":"Customer Pay"}</p>
        <hr className='w-full my-4'/>
        <p title='technician notes' className='self-start whitespace-pre-line w-full'>Tech Notes: <br />{repairOrder.notes}</p>
        <hr className='w-full my-4'/>
        <div className='flex w-full justify-between'>
            <Link to={`/user/${userId}`} className='underline hover:text-violet-900'>Go to Dashboard</Link>
            <DeleteButton path={'../repairorder/delete/'}  id={repairOrder._id}/>
            <button className='hover:text-green-300'>Edit <FontAwesomeIcon icon={faPenToSquare} /></button>
        </div>
    </main>
  )
}
