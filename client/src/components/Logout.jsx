import React from 'react'
import { Form } from 'react-router-dom'
import { faSignOut } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Logout(props) {
  return (
    <Form action='/logout' method='POST'>
        <button className='flex gap-4 items-center text-slate-600'><FontAwesomeIcon aria-hidden={true} icon={faSignOut}/>Log out</button>
    </Form>
  )
}
