import React from "react";
import { Form } from "react-router-dom";

function Part({ jobId, name, price }) {
  return (
    <Form className="flex flex-col px-4 gap-8">
      <h2 className="text-lg">Part</h2>
      <input type="hidden" name="jobId" value={jobId} />
      <label className="flex flex-col gap-2">
        Name
        <input
          className="outline outline-2 outline-gray-200 rounded px-1 py-2"
          type="text"
          name="name"
          defaultValue={name}
        />
      </label>
      <label className="flex flex-col gap-2">
        Price
        <input
          className="outline outline-2 outline-gray-200 rounded px-1 py-2"
          type="number"
          step={0.01}
          name="price"
          defaultValue={price}
        />
      </label>
    </Form>
  );
}

export default Part;
