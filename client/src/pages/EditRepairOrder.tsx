import React from "react";
import {
  Form,
  useParams,
  useRouteLoaderData,
  useActionData,
  useNavigation,
} from "react-router-dom";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import loadable from "@loadable/component";
import { toLocalDateString, toISOString } from "@utils/datesHelpers";
import type { ValidationResult } from "@utils/formValidator";
import type { RepairOrder } from "@components/RepairOrders";
const FontAwesomeIcon = loadable(() =>
  import("@fortawesome/react-fontawesome").then((module) => ({
    default: module.FontAwesomeIcon,
  }))
);

export default function EditRepairOrder() {
  const repairs = useRouteLoaderData("root") as RepairOrder[];
  const { repairId } = useParams();
  const navigation = useNavigation();
  const repair = repairs.find((repair) => repair._id === repairId);
  const inputs = useActionData() as ValidationResult;

  if(!repair) {
    return <h2>Looks Like we couldn't find that repair order.</h2>
  }

  const date = toLocalDateString(repair.created_on);

  return (
    <main>
      <Form
        method="put"
        action={`../editrepairorder/${repair.id}`}
        className="sm:max-w-max m-auto min-h-screen px-4 mt-4"
      >
        <div className="shadow-form rounded overflow-hidden pb-4">
          <div className="bg-form-header text-lg text-ro-slate-100 py-2 pl-4">
            <h2>Edit Repair</h2>
          </div>
          <input type="hidden" id="id" name="id" value={repair.id} />
          <div className="flex flex-col gap-4 px-4 text-ro-slate-900">
            {inputs && (
              <span className="text-red-600">
                Please check the highlighted fields!
              </span>
            )}
            <label className="font-semibold flex flex-col gap-3">
              RO Number*
              <input
                className={`p-2 font-normal rounded focus:outline-ro-slate-900 ${
                  inputs?.ro_number?.isInvalid
                    ? "border-2 border-red-600"
                    : "border-2 border-ro-slate-300"
                }`}
                type="text"
                name={"ro_number"}
                defaultValue={repair.ro_number}
              />
              {inputs && inputs.ro_number?.isInvalid && (
                <span className="text-red-600">{inputs.ro_number.message}</span>
              )}
            </label>
            <label className="font-semibold flex flex-col gap-3">
              VIN*
              <input
                className={`p-2 font-normal rounded focus:outline-ro-slate-900 ${
                  inputs?.vin?.isInvalid
                    ? "border-2 border-red-600"
                    : "border-2 border-ro-slate-300"
                }`}
                type="text"
                name="vin"
                defaultValue={repair.vin}
              />
              {inputs && inputs.vin?.isInvalid && (
                <span className="text-red-600">{inputs.vin.message}</span>
              )}
            </label>
            <label className="font-semibold flex flex-col gap-3">
              Created On
              <input
                className="p-2 font-normal rounded border-2 border-ro-slate-300 focus:outline-none focus:border-b focus:border-ro-slate-900"
                type="date"
                name="created_on"
                defaultValue={toISOString(date)}
              />
            </label>
            <label className="font-semibold flex gap-4">
              Warranty
              <input
                type="checkbox"
                name="isWarranty"
                defaultChecked={repair.isWarranty}
              />
            </label>
            <label className="font-semibold flex flex-col gap-3">
              Notes
              <textarea
                className="bg-inherit p-1 rounded outline-none focus:border focus:border-ro-slate-900"
                name="notes"
                defaultValue={repair.notes}
                cols={30}
                rows={10}
              />
            </label>
            <button
              className="text-ro-slate-100 font-semibold px-6 py-2 mt-4 self-center bg-btn-secondary rounded-md m-auto transition delay-100 hover:bg-btn-primary focus:ring-4"
              type="submit"
              disabled={navigation.state !== "idle"}
            >
              {navigation.state === "idle" ? "Submit" : "Submitting"}{" "}
              <FontAwesomeIcon aria-hidden icon={faPenToSquare} />
            </button>
          </div>
        </div>
      </Form>
    </main>
  );
}