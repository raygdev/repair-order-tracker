import React from "react";
import { Outlet } from "react-router-dom";

export default function RepairOrders() {

  return (
    <div className="bg-sky-700 h-screen ">
      <h2 className="text-xl font-bold text-center text-white">
        Repair Orders
      </h2>
      <ul>
        
      </ul>

      <Outlet />
    </div>
  );
}

export async function repairOrderLoader({params}){
    console.log(params.userId)
    return
} 
