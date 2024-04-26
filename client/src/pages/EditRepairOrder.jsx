import React from 'react'
import { Form, useParams, useRouteLoaderData, useActionData, useNavigation } from 'react-router-dom'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import loadable from '@loadable/component'
import { toLocalDateString, toISOString } from '../utils/datesHelpers'
const FontAwesomeIcon = loadable(() => import('@fortawesome/react-fontawesome').then(module => ({default:module.FontAwesomeIcon})))

export default function EditRepairOrder() {
    const { repairOrders } = useRouteLoaderData('root')
    const { repairId } = useParams()
    const navigation = useNavigation()
    const repairOrder = repairOrders.find(ro => ro._id === repairId)
    const inputs = useActionData()
    
    const date = toLocalDateString(repairOrder.created_on)

     return (
        <main>

            <Form
                method='put'
                action={`../editrepairorder/${repairId}`}
                className='sm:max-w-max m-auto min-h-screen justify-between px-4 mt-4'
            >
                <div className='shadow-form rounded overflow-hidden pb-4'>
                    <div className='bg-form-header text-ro-slate-100 py-2 pl-4'>
                        <h2 className='text-lg'>Edit Repair</h2>
                    </div>
                    <div className='flex flex-col justify-between px-4'>
                    <div className='flex flex-col text-ro-slate-900'>
                        {inputs && <span className='text-red-600'>Please check the highlighted fields!</span>}
                        <label htmlFor="ro_number" className='font-semibold'>RO Number</label>
                        <input
                            className={`p-2 rounded focus:outline-ro-slate-900 ${inputs?.ro_number.isInvalid ? "border-2 border-red-600": "border-2 border-ro-slate-300"}`}
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
                            className={`p-2 rounded focus:outline-ro-slate-900 ${inputs?.vin.isInvalid ? "border-2 border-red-600":"border-2 border-ro-slate-300"}`}
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
                            className='p-2 rounded border-2 border-ro-slate-300 focus:outline-none focus:border-b focus:border-ro-slate-900'
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
                            className='bg-inherit p-1 rounded outline-none focus:border focus:border-ro-slate-900'
                            name="notes"
                            id="notes"
                            defaultValue={repairOrder.notes}
                            cols="30"
                            rows="10"
                        />
                    </div>
                    <button
                        className='text-ro-slate-100 font-semibold px-6 py-2 mt-4 self-center bg-btn-secondary rounded-md m-auto transition delay-100 hover:bg-btn-primary focus:ring-4'
                        type='submit'
                        disabled={navigation.state !== 'idle'}
                    >
                        {navigation.state === 'idle' ? 'Submit': 'Submitting'} <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                </div>
            </div>
            </Form>
        </main>
     )
}