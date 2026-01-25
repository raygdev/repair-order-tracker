import loadable from "@loadable/component";
import { type Vehicle } from "./Vehicle";
const AddRepairButton = loadable(() => import('./AddRepairButton'))
const CreateFirstRepair = loadable(() => import('./CreateFirstRepair'))
const RepairOrderCard = loadable(() => import('./RepairOrderCard'))

export interface RepairOrder {
  id: string,
  _id: string
  isWarranty: boolean,
  created_on: string,
  vin: string,
  ro_number: string,
  notes: string,
  vehicle: Vehicle
}

interface RepairOrderProps {
  repairOrders: RepairOrder[]
}

export default function RepairOrders({ repairOrders }: RepairOrderProps) {

  const sortedOrders =
    repairOrders?.sort((a, b) => a._id < b._id ? 1 : -1 )
      .map((ro) => {
        return (
          <RepairOrderCard key={ro.id} repairOrder={ro} />
        );
      });

  return (
    <div className="min-h-screen text-ro-slate-900 text-xl flex flex-col align-center mt-6 pt-6 m-auto w-full rounded-lg container">
      <h2 className="font-bold self-center">
        Repair Orders
      </h2>
      {sortedOrders.length > 0 && <AddRepairButton />}
      {sortedOrders.length ? (
        <ul className="px-4 grid auto-rows-fr grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {sortedOrders}
        </ul>
      ) : (
        <CreateFirstRepair  />
      )}
    </div>
  );
}