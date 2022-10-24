import React from 'react'
import { useRouteLoaderData, useParams } from 'react-router-dom'

//TODO pretty up the UI

export default function RepairOrder() {

    const { repairOrders } = useRouteLoaderData('root')
    const { repairId } = useParams()

    const [repairOrder ] = repairOrders.filter(RO => RO._id == repairId)

    let date = new Date(repairOrder.created_on).toLocaleDateString()

  return (
    <main className='flex flex-col bg-sky-500 items-center text-white p-4 my-5'>
        <div className='flex justify-between w-96 p-4'>
            <p title='repair order number' className=''>Repair Order # {repairOrder.ro_number}</p>
            <p title='repair order creation date' className=''>Created On <date>{date}</date></p>
        </div>
        <p title='vehicle vin number'>VIN # {repairOrder.vin}</p>
        <p title='pay type'>Pay Type: {repairOrder.isWarranty ? "Warranty":"Customer Pay"}</p>
        <p title='technician notes'>Tech Notes: <br /><hr/>{repairOrder.notes}</p>
    </main>
  )
}
