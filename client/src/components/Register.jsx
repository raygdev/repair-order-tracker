import React from "react";
import { Form, useActionData } from "react-router-dom";

export default function Register (props) {
  const inputs = useActionData()
  return (
    <main className=" flex w-full flex-col min-h-screen bg-gradient-to-br from-blue-800 via-sky-300">
        <div className="w-full xs:max-w-md m-auto">
          <Form
            className="p-4 min-h-max flex flex-col bg-[#fffff2] justify-between rounded shadow-xl shadow-slate-500"
            method="post"
            action="../register"
          >
            <div className="mb-4 text-center">
              <h2 className="text-2xl mb-1 self-center bg-gradient-to-r from-blue-900 to-blue-700 bg-clip-text text-transparent font-extrabold">Please Register!</h2>
              <p className="text-sm self-center font-medium">It's <span>Free</span>!</p>
            </div>
            {inputs && !inputs.isValid && <span className="text-red-700">Please check your information!</span>}
            <label className="flex flex-col gap-1 my-1">First Name
              <input
                id='firstName'
                className={`p-2 rounded ${(inputs && inputs.firstName.isInvalid)? "border-2 border-red-600": "border border-slate-400"}`}
                type="text"
                name="firstName"
                placeholder="First Name"
              />
              {inputs && inputs.firstName.isInvalid && <div className=" text-red-600">{inputs.firstName.message}</div>}
            </label>
            <label className="flex flex-col gap-1 my-1">Last Name
              <input
                id='lastName'
                className={`p-2 rounded ${(inputs && inputs.lastName.isInvalid)? "border-2 border-red-600": "border border-slate-400"}`}
                type="text"
                name="lastName"
                placeholder="Last Name"
              />
              {inputs && inputs.lastName.isInvalid && <div className="text-red-600">{inputs.lastName.message}</div>}
            </label>
            <label className="flex flex-col gap-1 my-1">Shop Name (optional)
              <input
                id='shopName'
                className={`p-2 rounded ${(inputs && inputs.shopName.isInvalid)? "border-2 border-red-600": "border border-slate-400"}`}
                type="text"
                name="shopName"
                placeholder="Shop Name"
              />
            </label>
            {inputs && inputs.shopName.isInvalid && <div className="text-red-600">{inputs.shopName.message}</div>}
            <label className="flex flex-col gap-1 my-1">Email
              <input
                id='email'
                className={`p-2 rounded ${(inputs && inputs.email.isInvalid)? "border-2 border-red-600": "border border-slate-400"}`}
                type="text"
                name="email"
                placeholder="Email"
              />
              {inputs && inputs.email.isInvalid && <div className="text-red-600">{inputs.email.message}</div>}
            </label>
            <label className="flex flex-col gap-1 my-1">Password
              <input
                id='password'
                className={`p-2 rounded ${(inputs && inputs.password.isInvalid)? "border-2 border-red-600": "border border-slate-400"}`}
                type="password"
                name="password"
                placeholder="Password"
              />
              {inputs && inputs.password.isInvalid && <div className="whitespace-pre-wrap text-red-600">{inputs.password.message}</div>}
            </label>
            <button className="text-white bg-sky-700 self-center px-1 py-1 rounded mt-4">
              Submit
            </button>
          </Form>
      </div>
    </main>
  );
};
