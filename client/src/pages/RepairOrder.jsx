import React, { useEffect } from "react";
import { useRouteLoaderData, useParams, Link } from "react-router-dom";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import loadable from "@loadable/component";
import { toLocalDateString } from "@utils/datesHelpers";
const DeleteButton = loadable(() => import("@components/DeleteButton"));
const FontAwesomeIcon = loadable(() =>
  import("@fortawesome/react-fontawesome").then((module) => ({
    default: module.FontAwesomeIcon,
  }))
);
const Vehicle = loadable(() =>
  import("@components/Vehicle").then((module) => ({
    default: module.Vehicle,
  }))
);
const InvalidVin = loadable(() =>
  import("@components/InvalidVin").then((module) => ({
    default: module.InvalidVin,
  }))
);

const Job = loadable(() => 
  import('../features/repair-order/components/job')
)

const Part = loadable(() => 
  import('../features/repair-order/components/part')
)

export default function RepairOrder() {
  useEffect(() => {
    document.title = "Repair Order";
  }, []);

  const repairs = useRouteLoaderData("root");
  // const data = useLoaderData()
  const { repairId } = useParams();

  const repair = repairs.find((RO) => RO.id === repairId);
  const vehicle = repair.vehicle;

  let date = toLocalDateString(repair.created_on);

  return (
    <main className="items-center pb-4 my-5 mx-auto min-h-max xs: max-w-xl bg-[#fffff2] rounded shadow-lg">
      <div className="shadow-md p-8 flex justify-around">
        <h2 className="text-lg text">Repair Order# {repair.ro_number}</h2>
        <p>Created On {date}</p>
      </div>
      <section
        className={
          vehicle ? "border-b text-center p-4" : "border-b p-4 flex flex-col"
        }
      >
        {vehicle ? (
          <Vehicle vehicle={vehicle} isWarranty={repair.isWarranty} />
        ) : (
          <InvalidVin vin={repair.vin} />
        )}
        <p title="pay type" className="whitespace-pre-wrap">
          Pay Type: {repair.isWarranty ? "Warranty" : "Customer Pay"}
        </p>
      </section>

      <section className="w-full border-b p-4">
        <h2 className="text-lg ">Technician Notes</h2>
        <p title="technician notes" className="whitespace-pre-line w-full my-6">
          {repair.notes}
        </p>
      </section>
      <section className="flex w-full justify-between p-4">
        <Link to={`/dashboard`} className="underline hover:text-violet-900">
          Go to Dashboard
        </Link>
        <DeleteButton
          path={"../repairorder/delete/"}
          id={repair.id}
          text={"Delete"}
        />
        <Link
          to={`../editrepairorder/${repairId}`}
          className="transition ease-in-out delay-100 hover:text-green-300 font-semibold"
        >
          Edit <FontAwesomeIcon icon={faPenToSquare} />
        </Link>
      </section>
      {
        repair?.jobs.length > 0 &&
        repair.jobs.map((job, idx) => {
          
          const parts = job.parts.map((part, index) => {
            return <Part key={part.id || index} name={part.name} price={part.price} jobId={job.id} />
          })
          return (
            <React.Fragment key={job.id}>
              <Job description={job.description} labor={job.labor} jobId={job.id} />
              {parts}
            </React.Fragment>
          )
        })
      }
    </main>
  );
}
