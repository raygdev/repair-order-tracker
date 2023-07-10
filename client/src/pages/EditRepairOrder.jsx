import React from 'react'
import { Form, useParams, useRouteLoaderData, useActionData } from 'react-router-dom'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import loadable from '@loadable/component'
import { toLocalDateString, toISOString } from '../utils/datesHelpers'
const FontAwesomeIcon = loadable(() => import('@fortawesome/react-fontawesome').then(module => ({default:module.FontAwesomeIcon})))

export default function EditRepairOrder() {
    const { repairOrders } = useRouteLoaderData('root')
    const { repairId } = useParams()
    const repairOrder = repairOrders.find(ro => ro._id === repairId)
    const inputs = useActionData()
    
    const date = toLocalDateString(repairOrder.created_on)

     return (
        <Form method='put' action={`../editrepairorder/${repairId}`} className='flex flex-col p-4  w-5/6  sm:w-1/2  md:w-1/3 m-auto min-h-screen justify-between bg-[#fffff2] shadow-2xl my-4'>
            <h1 className='text-4xl text-center p-5'>Edit</h1>
            <div className='flex flex-col'>
                <input type="hidden" name="id" value={repairOrder.id} />
                <input type="hidden" name="userId" value={repairOrder.userId} />
                {inputs && <span className='text-red-600'>Please check the highlighted fields!</span>}
                <label htmlFor="ro_number" className='font-semibold'>RO Number</label>
                <input
                    className={`p-2 rounded focus:border-b focus:border-b-slate-400 focus:outline-none ${inputs?.ro_number.isInvalid ? "border-2 border-red-600": "border border-slate-400"}`}
                    type="text" 
                    id="ro_number"
                    name={'ro_number'}
                    defaultValue={repairOrder.ro_number}
                />
                {inputs && inputs.ro_number.isInvalid && <span className='text-red-600'>{inputs.ro_number.message}</span>}
            </div>
            <div className='flex flex-col'>
                <label htmlFor="vin" className='font-semibold'>VIN*</label>
                <input 
                    className={`p-2 rounded focus:outline-none focus:border-b focus:border-b-slate-400 ${inputs?.vin.isInvalid ? "border-2 border-red-600":"border border-slat-400"}`}
                    type="text" 
                    id="vin"
                    name='vin'
                    defaultValue={repairOrder.vin}
                />
                {inputs && inputs.vin.isInvalid && <span className='text-red-600'>{inputs.vin.message}</span>}
            </div>
            <div className='flex flex-col'>
                <label htmlFor="created_on" className='font-semibold'>Created On</label>
                <input 
                    className='p-2 rounded focus:outline-none focus:border-b focus:border-b-slate-400'
                    type="date" 
                    id="created_on"
                    name='created_on'
                    defaultValue={toISOString(date)}
                />
            </div>
            <div className='flex w-full'>
                <div className='flex gap-7 justify-between max-w-fit'>
                <label htmlFor="isWarranty" className='font-semibold'>Warranty</label>
                <input 
                    type="checkbox" 
                    id="isWarranty"
                    name='isWarranty'
                    defaultChecked={repairOrder.isWarranty}
                />
                </div>
            </div>
            <div className='flex flex-col'>
                <label htmlFor="notes" className='font-semibold'>Notes</label>
                <textarea
                    className='bg-inherit p-1 rounded'
                    name="notes" 
                    id="notes" 
                    defaultValue={repairOrder.notes}
                    cols="30" 
                    rows="10" 
                />
            </div>
            <button className='text-white font-semibold p-2 self-center bg-sky-800 rounded-md m-auto transition delay-100 hover:bg-sky-600' type='submit' >Edit <FontAwesomeIcon icon={faPenToSquare} /></button>
        </Form>
     )
}