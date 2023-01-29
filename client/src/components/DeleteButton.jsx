import React from "react";
import loadable from "@loadable/component";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
const Form = loadable(() =>
  import("react-router-dom").then((module) => ({ default: module.Form }))
);
const FontAwesomeIcon = loadable(() =>
  import("@fortawesome/react-fontawesome").then((module) => ({
    default: module.FontAwesomeIcon,
  }))
);

export default function DeleteButton(props) {
  const buttonText = props.text ? props.text + " " : "";
  return (
    <>
      <Form method="delete" action={`${props.path}${props.id}`}>
        <button
          aria-label="delete"
          type="submit"
          className="transition ease-in-out delay-100 hover:text-red-400 font-semibold"
        >
          {buttonText}
          <FontAwesomeIcon size={props.size} icon={faTrashCan} />
        </button>
      </Form>
    </>
  );
}
