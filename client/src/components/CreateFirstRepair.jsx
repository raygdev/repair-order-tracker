import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLink } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

export default function CreateFirstRepair({userId}) {
  return (
    <>
        <h3 className="text-white text-lg font-bold self-center m-auto hover:text-cyan-100">
         <Link to={`/user/${userId}/create-repair-order`}><FontAwesomeIcon icon={faLink}/> Let's Create a Repair Order!</ Link>
        </h3>
    </>
  )
}
