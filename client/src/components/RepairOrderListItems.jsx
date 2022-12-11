import React from "react";
import { faLongArrowAltRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import loadable from "@loadable/component";
const DeleteButton = loadable(() => import('./DeleteButton'))
const FontAwesomeIcon = loadable(() => import('@fortawesome/react-fontawesome').then(module => ({default:module.FontAwesomeIcon})))

export default function RepairOrderListItems(props) {
  return (
    <>
      <li className=" flex justify-between">
        <Link to={`repairorder/${props.id}`}>
          <FontAwesomeIcon icon={faLongArrowAltRight} /> {props.ro_number}
        </Link>
        <DeleteButton 
            path={'repairorder/delete/'} 
            id={props.id}
            size='lg'
        />
      </li>
    </>
  );
}
