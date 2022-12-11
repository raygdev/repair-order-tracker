import React, { useState } from "react";
import { redirect } from "react-router-dom";
import loadable from "@loadable/component";
import { useNavigation, useActionData } from "react-router-dom";
const Form = loadable(() =>
  import("react-router-dom").then((module) => ({ default: module.Form }))
);

export default function Login(){
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const navigation = useNavigation();
  const error = useActionData();

  function handleChange(e) {
    const { name, value } = e.target;
    setInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  }

  return (
    <main className="h-screen bg-gradient-to-tl from-blue-300 to-violet-200 flex flex-col w-full justify-center items-center">
      <div className="w-full px-4 xs:max-w-md min-w-max">
        <Form
          className="m-auto h-72 rounded bg-sky-200 flex flex-col px-8 py-6 justify-evenly shadow-lg shadow-slate-500"
          action="../login"
          method="POST"
        >
        <h2 className="text-4xl text-center text-transparent uppercase font-bold self-center mb-4 bg-clip-text bg-gradient-to-r from-sky-900 to-sky-500">
          Please log in!
        </h2>
          <label htmlFor="email">Email</label>
          <input
            className={`p-1 rounded ${
              error && !input.email && "border-2 border-red-400"
            }`}
            type="email"
            name="email"
            value={input.email}
            placeholder="Email"
            onChange={handleChange}
          />
          {error && !input.email && (
            <span className="text-red-500">Email required</span>
          )}
          <label htmlFor="password">Password</label>
          <input
            className={`p-1 rounded ${
              error && !input.password && "border-2 border-red-400"
            }`}
            type="password"
            name="password"
            value={input.password}
            placeholder="Password"
            onChange={handleChange}
          />
          {error && !input.password && (
            <span className="text-red-500">Password required</span>
          )}
          <button
            className="text-white min-h-max mt-5 disabled:bg-sky-500 bg-sky-700 self-center px-2 py-1 rounded  hover:bg-sky-900  active:bg-sky-300 active:text-slate-700 focus:outline-none focus:ring-4 focus:ring-sky-300"
            type="submit"
            disabled={navigation.state !== "idle"}
          >
            {navigation.state === "idle" ? "Login" : "Loading"}
          </button>
        </Form>
      </div>
      {error && (
        <span className="p-6 mt-6 text-center text-red-500">{error}</span>
      )}
    </main>
  );
};