import { useState } from 'react'
import { Form } from 'react-router-dom'

function Job({ description= "", labor = 0.0, jobId }) {
  const [editing, setEditing] = useState(!description)
  return (
    <Form action='/jobs/create' method='POST' className='flex flex-col gap-8 px-4'>
        <h2 className='text-lg'></h2>
        <input type="hidden" name="jobId" value={jobId} />
        <label className='flex flex-col'>
            Description
            <input
              className={`${editing ? "outline outline-2 outline-gray-200": "outline-none"} px-1 py-2 rounded`}
              type="text"
              name='description'
              defaultValue={description || ""}
              readOnly={!editing}
            />
        </label>
        <label className='flex flex-col'>
            Labor
            <input
              className={`${editing ? "outline outline-2  outline-gray-200": "outline-none"} px-1 py-2`}
              type="number"
              name='labor'
              defaultValue={labor} 
              readOnly={!editing}
              step={0.1}
            />
        </label>
        {
            editing ?
              <button type='submit'  onClick={() => setEditing(false)}>
                Save
              </button>
              :
              <button type='button' onClick={(e) => { e.preventDefault(); setEditing(true) }}>
                Edit
              </button>
            
        }
    </Form>
  )
}

export default Job