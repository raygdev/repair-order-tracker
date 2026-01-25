import React from "react";
import loadable from "@loadable/component";
import { useNavigation, useActionData, useLoaderData } from "react-router-dom";
const Form = loadable(() =>
  import("react-router-dom").then((module) => ({ default: module.Form }))
);

interface ErrorActionData {
  [key: string]: {
    isInvalid: boolean,
    message: string
  }
}

export default function Login() {
  const message = useLoaderData() as string  | undefined;
  const navigation = useNavigation();
  const error = useActionData() as ErrorActionData;
  const inputs = [
    { labelName: "Email", name: "email", type: "text" },
    { labelName: "Password", name: "password", type: "password" },
  ];
  return (
    <main className="h-screen flex flex-col w-full justify-center items-center text-ro-slate-900">
      <div className="w-full px-4 xs:max-w-md md:min-w-max">
        <h3
          className={`text-red-600 text-center text-2xl mb-4 ${
            !message ? "hidden" : ""
          }`}
        >
          {message}
        </h3>
        <Form
          className="m-auto min-h-max rounded flex flex-col px-8 py-6 gap-4 shadow-form"
          method="POST"
          replace
        >
          <h2 className="text-4xl text-center uppercase font-bold self-center mb-4">
            Sign In
          </h2>
          {inputs.map((input, i) => {
            return (
              <label key={i} className="flex flex-col gap-2">
                {input.labelName}
                <input
                  className={`p-1 rounded ${
                    error && error.email?.isInvalid
                      ? "border-2 border-red-600"
                      : "border-2 border-ro-slate-300"
                  }`}
                  type={input.type}
                  name={input.name}
                  placeholder={input.labelName}
                />
                {error && error[input.name]?.isInvalid && (
                  <span className="text-red-600">
                    {error[input.name]?.message}
                  </span>
                )}
              </label>
            );
          })}
          <button
            className="text-ro-slate-100 min-h-max mt-5 disabled:bg-ro-link-disable bg-ro-link-primary self-center px-6 py-1 rounded transition-all hover:bg-ro-link-hover focus:outline-none focus:ring-2"
            type="submit"
            disabled={navigation.state !== "idle"}
          >
            {navigation.state === "idle" ? "Login" : "Loading"}
          </button>
        </Form>
      </div>
      {error && typeof error === "string" && (
        <span className="p-6 mt-6 text-center text-red-500">{error}</span>
      )}
    </main>
  );
}
