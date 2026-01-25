import React from "react";
import loadable from "@loadable/component";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import type {  SizeProp } from "@fortawesome/fontawesome-svg-core";
import type { FontAwesomeIconProps } from "@fortawesome/react-fontawesome";
const Form = loadable(() =>
  import("react-router-dom").then((module) => ({ default: module.Form }))
);
const FontAwesomeIcon = loadable<FontAwesomeIconProps>(() =>
  import("@fortawesome/react-fontawesome").then((module) => ({
    default: module.FontAwesomeIcon,
  }))
);

interface DeleteProps {
  text?: string,
  path: string,
  id: string,
  size?: SizeProp
}

export default function DeleteButton(props: DeleteProps) {
  const buttonText = props.text ? props.text + " " : "";
  return (
    <>
      <Form method="delete" action={`${props.path}${props.id}`}>
        <button
          aria-label={buttonText || 'delete'}
          type="submit"
          className="transition ease-in-out delay-100 hover:text-red-400 font-semibold"
        >
          {buttonText}
          <FontAwesomeIcon aria-hidden {...(props.size? { size: props.size } : {})} icon={faTrashCan} />
        </button>
      </Form>
    </>
  );
}
