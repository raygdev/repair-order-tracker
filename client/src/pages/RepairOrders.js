import React, { Fragment} from "react";
import { Link } from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faLink, faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons'
import DeleteButton from "../components/DeleteButton";
import CreateRepairButton from "../components/CreateRepairButton";

export default function RepairOrders({ repairOrders, userId }) {

  const createButton = repairOrders.length ? <CreateRepairButton />: null

  const orders =
    repairOrders.length &&
    repairOrders.map((ro) => {
      return (
        <Fragment key={ro._id}>
          <li className=" flex justify-between text-white">
            <div>
            <FontAwesomeIcon icon={faLongArrowAltRight}/> {ro.ro_number} 
            </div>
            <DeleteButton id={ro._id}/></li>
        </Fragment>
      );
    });
    
  return (
    <div className="bg-sky-700 h-screen flex flex-col align-center mt-6 p-6 m-auto w-3/4 rounded-lg md:w-2/4">
      <h2 className="text-xl font-bold  text-white self-center">
        Repair Orders
      </h2>
      {createButton}
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
