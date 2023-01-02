import React from 'react'
import { Form } from 'react-router-dom'

export default function Logout(props) {
  return (
    <Form action='/logout' method='POST'>
        <button className={`p-4 'underline underline-offset-4' : ''`}>Logout</button>
    </Form>
  )
}
