import React from "react";
import { Form, redirect } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLink } from "@fortawesome/free-solid-svg-icons";

//TODO provide better error handling for form
//validate input

export default function CreateRepairOrder () {
  return (
    <div className="flex min-h-screen">
      <Form className="p-4 bg-sky-500 flex flex-col sm:h-5/6 min-h-[450px] sm:w-2/4 w-4/6 md:w-1/3 justify-between m-auto rounded shadow-lg shadow-slate-500" action="../create-repair-order" method="POST">
        <div>
        <label htmlFor="ro_number" className="text-white font-medium">
          RO Number*
        </label>
        <input
          id="ro_number"
          name="ro_number"
          type="number"
          placeholder="Enter Your RO Number "
          className="p-1 rounded w-full"
        />
        </div>
        <div>
        <label htmlFor="vin" className="text-white font-medium">
          VIN*
        </label>
        <input className="p-1 rounded w-full" id="vin" name="vin" type="text" placeholder="Enter your VIN" />
        </div>
        <div className="flex w-2/4 justify-between items-center">
        <label  htmlFor="isWarranty" className="text-white font-medium">Warranty</label>
        <input type='checkbox' id='isWarranty' name='isWarranty'/>
        </div>
        <div>
        <label htmlFor="notes" className="text-white font-medium">
          Notes
        </label>
        <textarea className="p-1 rounded w-full" id="notes" name="notes" rows={5} cols={5} />
        </div>
        <button className="text-white rounded bg-sky-800 mt-5 w-3/4 self-center px-1 py-3 hover:bg-sky-400" type="submit">Submit <FontAwesomeIcon icon={faExternalLink}/></button>
      </Form>
    </div>
  );
}

export async function createROActionLoader({request, params}) {
  const formData = await request.formData()
  const roData =Object.fromEntries(formData)
  let ro = {
    ...roData,
    isWarranty: roData.isWarranty ? true: false,
    userId:params.userId
  }

  return await createRO(ro,params.userId)

}


async function createRO(ro,userId) {
  const res = await fetch('/repairorder', {
    method:'POST',
    headers:{
      'Content-Type':'application/json'
    },
    body: JSON.stringify(ro)

  })

  if(!res.ok){
    throw await res.json()
  }
  return redirect(`/user/${userId}`)
}