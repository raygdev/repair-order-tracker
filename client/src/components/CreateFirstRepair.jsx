import React from "react";
import loadable from "@loadable/component";
import { faLink } from "@fortawesome/free-solid-svg-icons";
const Link = loadable(() => import('react-router-dom').then(module => ({default:module.Link})))
const FontAwesomeIcon = loadable(() => import('@fortawesome/react-fontawesome').then(module => ({default:module.FontAwesomeIcon})))

export default function CreateFirstRepair({ userId }) {
  return (
    <>
      <h3 className="text-white text-lg font-bold self-center m-auto hover:text-cyan-100">
        <Link to={`/user/${userId}/create-repair-order`}>
          <FontAwesomeIcon icon={faLink} /> Let's Create a Repair Order!
        </Link>
      </h3>
    </>
  );
}
