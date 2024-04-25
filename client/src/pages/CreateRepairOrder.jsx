import React from "react";
import {
  useActionData,
  useRouteLoaderData,
  useNavigation,
} from "react-router-dom";
import { faExternalLink } from "@fortawesome/free-solid-svg-icons";
import loadable from "@loadable/component";
const FontAwesomeIcon = loadable(() =>
  import("@fortawesome/react-fontawesome").then((module) => ({
    default: module.FontAwesomeIcon,
  }))
);
const Form = loadable(() =>
  import("react-router-dom").then((module) => ({ default: module.Form }))
);

//TODO provide better error handling for form
//validate input

export default function CreateRepairOrder() {
  const inputs = useActionData();
  const user = useRouteLoaderData("root");
  const navigation = useNavigation();
  return (
    <div className="flex min-h-screen">
      <Form
        className="flex flex-col sm:h-5/6 min-h-[450px] sm:w-2/4 w-4/6 md:w-1/3 justify-between m-auto rounded overflow-hidden shadow-form shadow-slate-500"
        method="POST"
      >
        <div className="text-ro-slate-100 bg-btn-secondary py-3 px-2">
          Create a Repair
        </div>
        <div className="p-4 flex flex-col text-ro-slate-900 justify-between gap-3">
          {inputs && !inputs.isValid && (
            <span className="text-red-600">
              Please check the highlighted fields
            </span>
          )}
          <div>
            <input type="hidden" name="userId" value={user._id} />
            <label htmlFor="ro_number" className="font-medium">
              RO Number*
            </label>
            <input
              id="ro_number"
              name="ro_number"
              type="text"
              placeholder="Enter Your RO Number "
              className={`p-1 rounded w-full  ${
                inputs && inputs?.ro_number.isInvalid
                  ? "border-2 border-red-600"
                  : "border-2 border-ro-slate-300 focus:outline-ro-slate-900"
              }`}
            />
            {inputs && inputs.ro_number.isInvalid && (
              <span className="text-red-600">{inputs.ro_number.message}</span>
            )}
          </div>
          <div>
            <label htmlFor="vin" className="font-medium">
              VIN*
            </label>
            <input
              className={`p-1 rounded w-full ${
                inputs && inputs?.vin.isInvalid
                  ? "border-2 border-red-600"
                  : "border-2 border-ro-slate-300 focus:outline-ro-slate-900"
              }`}
              id="vin"
              name="vin"
              type="text"
              placeholder="Enter your VIN"
            />
            {inputs && inputs.vin.isInvalid && (
              <span className="text-red-600">{inputs.vin.message}</span>
            )}
          </div>
          <div className="flex w-2/4 justify-between items-center">
            <label htmlFor="isWarranty" className="font-medium">
              Warranty
            </label>
            <input type="checkbox" id="isWarranty" name="isWarranty" />
          </div>
          <div>
            <label htmlFor="notes" className="font-medium">
              Notes
            </label>
            <textarea
              className="p-1 rounded w-full border border-ro-slate-300 focus:outline-ro-slate-500"
              id="notes"
              name="notes"
              rows={5}
              cols={5}
            />
          </div>
          <button
            className="text-slate-100 rounded bg-btn-secondary hover:bg-btn-hover disabled:bg-btn-disabled mt-5 px-5 self-center py-3"
            type="submit"
            disabled={navigation.state !== "idle"}
          >
            Submit <FontAwesomeIcon icon={faExternalLink} />
          </button>
        </div>
      </Form>
    </div>
  );
}
