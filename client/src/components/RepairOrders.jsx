import React from "react";
import AddRepairButton from "./AddRepairButton";
import RepairOrderListItems from "./RepairOrderListItems";
import CreateFirstRepair from "./CreateFirstRepair";

export default function RepairOrders({ repairOrders, userId }) {

  const sortedOrders =
    repairOrders.length &&
    repairOrders
      .sort((a, b) => {
        if (a._id > b._id) {
          return -1;
        }
      })
      .map((ro) => {
        return (
          <RepairOrderListItems
            key={ro._id}
            id={ro._id}
            ro_number={ro.ro_number}
          />
        );
      });

  return (
    <div className="bg-sky-700 h-screen flex flex-col align-center mt-6 p-6 m-auto w-3/4 rounded-lg md:w-2/4">
      <h2 className="text-xl font-bold  text-white self-center">
        Repair Orders
      </h2>
      {sortedOrders.length && <AddRepairButton />}
      {sortedOrders.length ? (
        <ul>{sortedOrders}</ul>
      ) : (
        <CreateFirstRepair userId={userId} />
      )}
    </div>
  );
}