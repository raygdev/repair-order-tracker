import React from "react";
import { Link, Outlet } from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faLink } from '@fortawesome/free-solid-svg-icons'

export default function RepairOrders({ repairOrders, userId }) {
  const orders =
    repairOrders.length &&
    repairOrders.map((ro) => {
      return (
        <>
          <li key={ro.ro_id}>{ro.ro_number}</li>
        </>
      );
    });
  return (
    <div className="bg-sky-700 h-screen flex flex-col align-center mt-6 p-6 m-auto w-3/4 rounded-lg md:w-2/4">
      <h2 className="text-xl font-bold  text-white self-center">
        Repair Orders
      </h2>
      {repairOrders.length ? (
        <ul>{orders}</ul>
      ) : (
        <h3 className="text-white text-lg font-bold self-center m-auto hover:text-cyan-100">
         <Link to={`/user/${userId}/create-repair-order`}><FontAwesomeIcon icon={faLink}/> Let's Create a Repair Order!</ Link>
        </h3>
      )}
    </div>
  );
}

export async function repairOrderLoader({ params }) {
  console.log(params.userId);
  return;
}
