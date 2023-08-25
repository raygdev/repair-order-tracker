import React, { useEffect } from 'react'
import { useRouteLoaderData, useLoaderData, useParams, Link } from 'react-router-dom'
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
    const data = useLoaderData()
    const { repairId, userId } = useParams()

    const repairOrder  = repairOrders.find(RO => RO._id === repairId)

    let date = toLocalDateString(repairOrder.created_on)

  return (
    <main className='items-center pb-4 my-5 mx-auto min-h-max xs: max-w-xl bg-[#fffff2] rounded shadow-lg'>
        <div  className='shadow-md p-8 flex justify-around'>
            <h2 className='text-lg text'>Repair Order# {repairOrder.ro_number}</h2>
            <p date={date}>Created On {date}</p>
        </div>
        { (data && typeof data !== "string" &&
            <section className='border-b p-4 flex flex-col'>
                <h2 className='text-lg'>Vehicle Info</h2>
                <div className='self-center text-slate-500'>
                    <p title='Vehicle Identification Number'>VIN# {data.vehicle.VIN}</p>
                    <p className='py-2'>Year: <span className='border py-1 px-4 inline-block'>{data.vehicle.Year}</span></p>
                    <p className='py-2'>Make: <span className='border py-1 px-4 inline-block'>{data.vehicle.Make}</span></p>
                    <p className='py-2'>Model: <span className='border py-1 px-4 inline-block'>{data.vehicle.Model}</span></p>
                    <p className='py-2'>Engine Size: <span className='border py-1 px-4 inline-block'>{data.vehicle.EngineSize}</span></p>
                </div>
                <p title='pay type' className='whitespace-pre-wrap'>Pay Type: {repairOrder.isWarranty ? "Warranty":"Customer Pay"}</p>
            </section>)
            ||  
            (<section className='border-b text-center p-4'>
                <p title='vehicle vin number'>VIN# {repairOrder.vin}</p>
                <p className='text-red-500'>{data}! Please try recreating the repair order and check that the vin is correct!</p>
                <p title='pay type' className='whitespace-pre-wrap'>Pay Type: {repairOrder.isWarranty ? "Warranty":"Customer Pay"}</p>
            </section>)
        }

        <section className='w-full border-b p-4'>
            <h2 className='text-lg '>Technician Notes</h2>
            <p title='technician notes' className='whitespace-pre-line w-full my-6'>{repairOrder.notes}</p>
        </section>
        <section className='flex w-full justify-between p-4'>
            <Link to={`/user/${userId}`} className='underline hover:text-violet-900'>Go to Dashboard</Link>
            <DeleteButton path={'../repairorder/delete/'}  id={repairOrder._id} text={'Delete'}/>
            <Link to={`../editrepairorder/${repairId}`} className='transition ease-in-out delay-100 hover:text-green-300 font-semibold'>Edit <FontAwesomeIcon icon={faPenToSquare} /></Link>
        </section>
    </main>
  )
}
