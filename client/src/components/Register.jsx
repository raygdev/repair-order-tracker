import React from "react";
import { Form, useActionData, useNavigation } from "react-router-dom";

export default function Register (props) {
  const navigation = useNavigation()
  const inputs = useActionData()
  return (
    <main className=" flex w-full flex-col min-h-screen text-ro-slate-900">
        <div className="w-full xs:max-w-md m-auto">
          <Form
            className="p-4 min-h-max flex flex-col justify-between rounded shadow-form"
            method="post"
            action="../register"
          >
            <div className="mb-4 text-center">
              <h2 className="text-2xl mb-1 self-center font-extrabold">Register</h2>
              <p className="text-sm self-center font-medium">It's <span>Free</span>!</p>
            </div>
            {inputs && !inputs.isValid && <span className="text-red-700">Please check your information!</span>}
            <label className="flex flex-col gap-1 my-1">First Name
              <input
                id='firstName'
                className={`p-2 rounded ${(inputs && inputs.firstName.isInvalid)? "border-2 border-red-600": "border-2 border-ro-slate-300"}`}
                type="text"
                name="firstName"
                placeholder="First Name"
              />
              {inputs && inputs.firstName.isInvalid && <div className=" text-red-600">{inputs.firstName.message}</div>}
            </label>
            <label className="flex flex-col gap-1 my-1">Last Name
              <input
                id='lastName'
                className={`p-2 rounded ${(inputs && inputs.lastName.isInvalid)? "border-2 border-red-600": "border-2 border-ro-slate-300"}`}
                type="text"
                name="lastName"
                placeholder="Last Name"
              />
              {inputs && inputs.lastName.isInvalid && <div className="text-red-600">{inputs.lastName.message}</div>}
            </label>
            <label className="flex flex-col gap-1 my-1">Shop Name (optional)
              <input
                id='shopName'
                className={`p-2 rounded ${(inputs && inputs.shopName.isInvalid)? "border-2 border-red-600": "border-2 border-ro-slate-300"}`}
                type="text"
                name="shopName"
                placeholder="Shop Name"
              />
            </label>
            {inputs && inputs.shopName.isInvalid && <div className="text-red-600">{inputs.shopName.message}</div>}
            <label className="flex flex-col gap-1 my-1">Email
              <input
                id='email'
                className={`p-2 rounded ${(inputs && inputs.email.isInvalid)? "border-2 border-red-600": "border-2 border-ro-slate-300"}`}
                type="text"
                name="email"
                placeholder="Email"
              />
              {inputs && inputs.email.isInvalid && <div className="text-red-600">{inputs.email.message}</div>}
            </label>
            <label className="flex flex-col gap-1 my-1">Password
              <input
                id='password'
                className={`p-2 rounded ${(inputs && inputs.password.isInvalid)? "border-2 border-red-600": "border-2 border-ro-slate-300"}`}
                type="password"
                name="password"
                placeholder="Password"
              />
              {inputs && inputs.password.isInvalid && <div className="whitespace-pre-wrap text-red-600">{inputs.password.message}</div>}
            </label>
            <button
              className="text-ro-slate-100 hover:bg-ro-link-hover disabled:bg-ro-link-disable bg-ro-link-primary self-center px-6 py-2 rounded mt-4"
              disabled= {navigation.state !== 'idle'}
            >
              {navigation.state === 'idle' ? "Submit": "Submitting"}
            </button>
          </Form>
      </div>
    </main>
  );
};
