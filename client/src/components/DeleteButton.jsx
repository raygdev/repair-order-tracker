import loadable from '@loadable/component'
import React from 'react'
import { redirect } from 'react-router-dom'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
const Form = loadable(() => import('react-router-dom').then(module => ({default: module.Form})))
const FontAwesomeIcon = loadable(() => import('@fortawesome/react-fontawesome').then(module => ({default:module.FontAwesomeIcon})))

export default function DeleteButton(props) {
    const buttonText = props.text ? (props.text + ' ') : ''
  return (
    <>
        <Form method='delete' action={`${props.path}${props.id}`}>
            <button type='submit' className='transition ease-in-out delay-100 hover:text-red-400 font-semibold'>{buttonText}<FontAwesomeIcon icon={faTrashCan} /></button>
        </Form>
    </>
  )
}


export async function deleteRepairOrderAction({params}){
    const id = await params.repairId
    const userId = await params.userId

    const ids = {
        ro_id: id,
        userId: userId
    }

    await deleteRepairOrder(ids)

    return redirect(`/user/${userId}`)

}

async function deleteRepairOrder(ids){
    
    const res = await fetch('/repairorder',{
        method: 'delete',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(ids)
    })

    if (!res.ok){
        throw res
    }

    return 
}