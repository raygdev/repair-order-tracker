import React from "react";
import loadable from "@loadable/component";
// import RepairOrderListItems from "./RepairOrderListItems";
const AddRepairButton = loadable(() => import('./AddRepairButton'))
const CreateFirstRepair = loadable(() => import('./CreateFirstRepair'))
const RepairOrderListItems = loadable(() => import('./RepairOrderListItems'))
const RepairOrderCard = loadable(() => import('./RepairOrderCard'))

export default function RepairOrders({ repairOrders, userId }) {

  const sortedOrders =
    repairOrders.length &&
    repairOrders
      .sort((a, b) => a._id < b._id ? 1 : -1 )
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
      {sortedOrders.length && <AddRepairButton />}
      {sortedOrders.length ? (
        <ul className="px-4 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {sortedOrders}
        </ul>
      ) : (
        <CreateFirstRepair userId={userId} />
      )}
    </div>
  );
}