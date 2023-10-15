import React from "react";
import { useActionData, useRouteLoaderData } from "react-router-dom";
import { faExternalLink } from "@fortawesome/free-solid-svg-icons";
import loadable from "@loadable/component";
const FontAwesomeIcon = loadable(() => import('@fortawesome/react-fontawesome').then(module => ({default:module.FontAwesomeIcon})))
const Form = loadable(() => import('react-router-dom').then(module => ({default:module.Form})))

//TODO provide better error handling for form
//validate input

export default function CreateRepairOrder() {
  const inputs = useActionData()
  const user = useRouteLoaderData('root')
  return (
    <div className="flex min-h-screen">
      <Form
        className="p-4 bg-sky-500 flex flex-col sm:h-5/6 min-h-[450px] sm:w-2/4 w-4/6 md:w-1/3 justify-between m-auto rounded shadow-lg shadow-slate-500"
        method="POST"
      >
        {inputs && !inputs.isValid && <span className="text-red-600">Please check the highlighted fields</span>}
        <div>
          <input type="hidden" name="userId" value={user._id} />
          <label htmlFor="ro_number" className="text-white font-medium">
            RO Number*
          </label>
          <input
            id="ro_number"
            name="ro_number"
            type="text"
            placeholder="Enter Your RO Number "
            className={`p-1 rounded w-full ${(inputs && inputs?.ro_number.isInvalid) ? "border-2 border-red-600": "border border-slate-400"}`}
          />
          {inputs && inputs.ro_number.isInvalid && <span className="text-red-600">{inputs.ro_number.message}</span>}
        </div>
        <div>
          <label htmlFor="vin" className="text-white font-medium">
            VIN*
          </label>
          <input
            className={`p-1 rounded w-full ${(inputs && inputs?.vin.isInvalid) ? "border-2 border-red-600": "border border-slate-600" }`}
            id="vin"
            name="vin"
            type="text"
            placeholder="Enter your VIN"
          />
          {inputs && inputs.vin.isInvalid && <span className="text-red-600">{inputs.vin.message}</span>}
        </div>
        <div className="flex w-2/4 justify-between items-center">
          <label htmlFor="isWarranty" className="text-white font-medium">
            Warranty
          </label>
          <input type="checkbox" id="isWarranty" name="isWarranty" />
        </div>
        <div>
          <label htmlFor="notes" className="text-white font-medium">
            Notes
          </label>
          <textarea
            className="p-1 rounded w-full"
            id="notes"
            name="notes"
            rows={5}
            cols={5}
          />
        </div>
        <button
          className="text-white rounded bg-sky-800 mt-5 w-3/4 self-center px-1 py-3 hover:bg-sky-400"
          type="submit"
        >
          Submit <FontAwesomeIcon icon={faExternalLink} />
        </button>
      </Form>
    </div>
  );
}
