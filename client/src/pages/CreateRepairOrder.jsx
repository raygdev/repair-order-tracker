import React from "react";
import { Form } from "react-router-dom";
export default function () {
  return (
    <div>
      <Form className="p-4 bg-sky-500 flex flex-col h-60 w-1/3 justify-between my-0 mx-auto rounded shadow-lg shadow-slate-500">
        <label htmlFor="ro_number" className="text-white font-medium">
          RO Number*
        </label>
        <input
          id="ro_number"
          name="ro_number"
          type="number"
          placeholder="Enter Your RO Number "
          className="p-1 rounded"
        />
        <label htmlFor="vin" className="text-white font-medium">
          VIN*
        </label>
        <input className="p-1 rounded" id="vin" name="vin" type="text" placeholder="Enter your VIN" />
        <label htmlFor="notes" className="text-white font-medium">
          Notes
        </label>
        <textarea className="rounded" id="notes" name="notes" rows={5} cols={5} />
      </Form>
    </div>
  );
}
