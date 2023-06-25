import React from "react";
import loadable from "@loadable/component";
// import RepairOrderListItems from "./RepairOrderListItems";
const AddRepairButton = loadable(() => import('./AddRepairButton'))
const CreateFirstRepair = loadable(() => import('./CreateFirstRepair'))
const RepairOrderListItems = loadable(() => import('./RepairOrderListItems'))

export default function RepairOrders({ repairOrders, userId }) {

  const sortedOrders =
    repairOrders.length &&
    repairOrders
      .sort((a, b) => a._id < b._id ? 1 : -1 )
      .map((ro) => {
        return (
          <RepairOrderListItems
            key={ro._id}
            id={ro._id}
            ro_number={ro.ro_number}
            vin={ro.vin}
          />
        );
      });

  return (
    <div className="bg-sky-700 h-screen text-white text-xl flex flex-col align-center mt-6 p-6 m-auto w-full rounded-lg md:w-2/4 xs:w-3/4">
      <h2 className="font-bold self-center">
        Repair Orders
      </h2>
      {sortedOrders.length && <AddRepairButton />}
      {sortedOrders.length ? (
        <ul className="text-lg">
          {sortedOrders}
        </ul>
      ) : (
        <CreateFirstRepair userId={userId} />
      )}
    </div>
  );
}