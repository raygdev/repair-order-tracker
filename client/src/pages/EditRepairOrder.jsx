import React, { useState } from 'react'
import { Form, useParams, useRouteLoaderData, redirect } from 'react-router-dom'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import loadable from '@loadable/component'
import { toLocalDateString, toISOString } from '../utils/datesHelpers'
const FontAwesomeIcon = loadable(() => import('@fortawesome/react-fontawesome').then(module => ({default:module.FontAwesomeIcon})))

export default function EditRepairOrder() {
    const { repairOrders } = useRouteLoaderData('root')
    const { repairId } = useParams()
    const repairOrder = repairOrders.find(ro => ro._id === repairId)
    
    const date = toLocalDateString(repairOrder.created_on)
    const [ repairInfo, setRepairInfo ] = useState({
        ...repairOrder,
        created_on: toISOString(date)
    })

    function handleFormChange(e){
        const { name, value, type, checked } = e.target;
        setRepairInfo(prevInfo => ({
            ...prevInfo,
            [ name ]: type === 'checkbox' ? checked : value
        }))
    }

     return (
        <Form method='put' action={`../repairorders/edit/${repairId}`} className='flex flex-col p-4 bg-sky-700 w-5/6  sm:w-1/2  md:w-1/3 lg:w-1/4 m-auto min-h-screen justify-between'>
            <div className='flex flex-col'>
                <label htmlFor="ro_number" className='text-white font-semibold'>RO Number</label>
                <input
                    className='p-1 rounded'
                    type="text" 
                    id="ro_number"
                    name={'ro_number'}
                    value={repairInfo.ro_number}
                    onChange={handleFormChange} 
                />
            </div>
            <div className='flex flex-col'>
                <label htmlFor="vin" className='text-white font-semibold'>VIN*</label>
                <input 
                    className='p-1 rounded'
                    type="text" 
                    id="vin"
                    name='vin'
                    value={repairInfo.vin}
                    onChange={handleFormChange} 
                />
            </div>
            <div className='flex flex-col'>
                <label htmlFor="created_on" className='text-white font-semibold'>Created On</label>
                <input 
                    className='p-1 rounded'
                    type="date" 
                    id="created_on"
                    name='created_on'
                    value={repairInfo.created_on}
                    onChange={handleFormChange} 
                />
            </div>
            <div className='flex w-full'>
                <div className='flex basis-1/2 justify-between '>
                <label htmlFor="isWarranty" className='text-white font-semibold'>Warranty</label>
                <input 
                    type="checkbox" 
                    id="isWarranty"
                    name='isWarranty'
                    checked={repairInfo.isWarranty}
                    value={repairInfo.isWarranty}
                    onChange={handleFormChange} 
                />
                </div>
            </div>
            <div className='flex flex-col'>
                <label htmlFor="notes" className='text-white font-semibold'>Notes</label>
                <textarea
                    className='bg-inherit text-white p-1 rounded'
                    name="notes" 
                    id="notes" 
                    value={repairInfo.notes}
                    onChange={handleFormChange}
                    cols="30" 
                    rows="10" 
                />
            </div>
            <button className='text-white font-semibold p-2 self-center bg-sky-800 rounded-md m-auto transition delay-100 hover:bg-sky-600' type='submit' >Edit <FontAwesomeIcon icon={faPenToSquare} /></button>
        </Form>
     )
}

export async function editRepairOrderAction({request,params}){
    const formData = await request.formData()
    const ro = Object.fromEntries(formData)
    const id = await params.repairId
    const userId = await params.userId
    const updatedRO = {
        ...ro,
        isWarranty: ro.isWarranty ? true: false,
        _id: id,
        created_on: ro.created_on.replace(/-/g,'/')
    }

    await editRo(updatedRO)

    return redirect(`/user/${userId}/repairorder/${id}`)

}

async function editRo(upatedRO){
    const res = await fetch('/repairorder',{
        method:'put',
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify(upatedRO)
    })

    if(!res.ok){
        throw res
    }

    return
}
