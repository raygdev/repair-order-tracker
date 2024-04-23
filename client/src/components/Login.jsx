import React from "react";
import loadable from "@loadable/component";
import { useNavigation, useActionData, useLoaderData } from "react-router-dom";
const Form = loadable(() =>
  import("react-router-dom").then((module) => ({ default: module.Form }))
);

export default function Login(){
  const message = useLoaderData()
  const navigation = useNavigation();
  const error = useActionData();
  return (
    <main className="h-screen flex flex-col w-full justify-center items-center text-ro-slate-900">
      <div className="w-full px-4 xs:max-w-md md:min-w-max">
        <h3 className={`text-red-600 text-center text-2xl mb-4 ${!message ? "hidden": ""}`}>{message}</h3>
        <Form
          className="m-auto min-h-max rounded flex flex-col px-8 py-6 justify-evenly shadow-form"
          method="POST"
          replace
        >
        <h2 className="text-4xl text-center uppercase font-bold self-center mb-4">
          Sign In
        </h2>
          <label htmlFor="email">Email</label>
          <input
            className={`p-1 rounded border-2 border-ro-slate-300 ${
              error && error.email?.isInvalid && "border-2 border-red-600"
            }`}
            type="text"
            name="email"
            placeholder="Email"
          />
          {error && error.email?.isInvalid && (
            <span className="text-red-600">{error.email.message}</span>
          )}
          <label htmlFor="password">Password</label>
          <input
            className={`p-1 rounded border-2 border-ro-slate-300 ${
              error && error.password?.isInvalid && "border-2 border-red-600"
            }`}
            type="password"
            name="password"
            placeholder="Password"
          />
          {error && error.password?.isInvalid && (
            <span className="text-red-600">{error.password.message}</span>
          )}
          <button
            className="text-ro-slate-100 min-h-max mt-5 disabled:bg-ro-link-disable bg-ro-link-primary self-center px-6 py-1 rounded  hover:bg-sky-900  active:bg-sky-300 active:text-slate-700 focus:outline-none focus:ring-4 focus:ring-sky-300"
            type="submit"
            disabled={navigation.state !== "idle"}
          >
            {navigation.state === "idle" ? "Login" : "Loading"}
          </button>
        </Form>
      </div>
      {error && (typeof error === "string") && (
        <span className="p-6 mt-6 text-center text-red-500">{error}</span>
      )}
    </main>
  );
}