import React, { useEffect } from 'react'
import { useRouteLoaderData, useParams, Link } from 'react-router-dom'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import loadable from '@loadable/component'
import { toLocalDateString } from '../utils/datesHelpers'
const DeleteButton = loadable(() => import('../components/DeleteButton'))
const FontAwesomeIcon = loadable(() => import('@fortawesome/react-fontawesome').then(module => ({default:module.FontAwesomeIcon})))


export default function RepairOrder() {
    useEffect(() => {
        document.title='Repair Order'
    }, [])

    const { repairOrders } = useRouteLoaderData('root')
    const { repairId, userId } = useParams()

    const repairOrder  = repairOrders.find(RO => RO._id === repairId)

    let date = toLocalDateString(repairOrder.created_on)

  return (
    <main className='bg-sky-500 items-center text-white p-4 mt-5 mx-auto min-h-max xs: max-w-xl'>
        <section className='text-center mb-10'>
            <p>Repair Order # {repairOrder.ro_number}</p>
            <p date={date}>Created On {date}</p>
        </section>
        <section className='border-b text-center py-4 mb-10'>
            <p title='vehicle vin number'>VIN # {repairOrder.vin}</p>
            <p title='pay type' className='whitespace-pre-wrap'>Pay Type: {repairOrder.isWarranty ? "Warranty":"Customer Pay"}</p>
        </section>
        <section className='w-full border-b py-4 mb-10'>
            <p title='technician notes' className='whitespace-pre-line w-full'>Tech Notes: <br />{repairOrder.notes}</p>
        </section>
        <section className='flex w-full justify-between py-4'>
            <Link to={`/user/${userId}`} className='underline hover:text-violet-900'>Go to Dashboard</Link>
            <DeleteButton path={'../repairorder/delete/'}  id={repairOrder._id} text={'Delete'}/>
            <Link to={`../editrepairorder/${repairId}`} className='transition ease-in-out delay-100 hover:text-green-300 font-semibold'>Edit <FontAwesomeIcon icon={faPenToSquare} /></Link>
        </section>
    </main>
  )
}
