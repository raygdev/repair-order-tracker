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
    <div className="min-h-screen px-4">
      <Form
        className="flex flex-col sm:max-w-max mt-11 gap-4 m-auto rounded overflow-hidden shadow-form shadow-slate-500"
        method="POST"
      >
        <div className="text-ro-slate-100 bg-btn-secondary py-3 px-2">
          Create a Repair
        </div>
        <div className="p-4 flex flex-col text-ro-slate-900 gap-3 font-medium">
          {inputs && !inputs.isValid && (
            <span className="text-red-600">
              Please check the highlighted fields
            </span>
          )}
          <input type="hidden" name="userId" value={user._id} />
          <label className="flex flex-col gap-2">
            RO Number*
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
          </label>
          <label className="font-medium flex flex-col gap-2">
            VIN*
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
          </label>
          <label className="flex justify-items-center gap-6">
            Warranty
            <input type="checkbox" id="isWarranty" name="isWarranty" />
          </label>
          <label className=" flex flex-col gap-2">
            Notes
            <textarea
              className="p-1 rounded w-full border border-ro-slate-300 focus:outline-ro-slate-500"
              id="notes"
              name="notes"
              rows={5}
              cols={5}
            />
          </label>
          <button
            className="text-slate-100 rounded bg-btn-secondary hover:bg-btn-hover disabled:bg-btn-disabled mt-5 px-5 self-center py-3"
            type="submit"
            disabled={navigation.state !== "idle"}
          >
            Submit <FontAwesomeIcon aria-hidden icon={faExternalLink} />
          </button>
        </div>
      </Form>
    </div>
  );
}
