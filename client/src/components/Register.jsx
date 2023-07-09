import React from "react";
import { Form } from "react-router-dom";

export default function Register (props) {
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
            <label className="flex flex-col gap-1 my-1">First Name
              <input
                id='firstName'
                className="peer p-2 rounded border border-slate-400"
                type="text"
                name="firstName"
                required={true}
                placeholder="First Name"
              />
              <div className="hidden peer-placeholder-shown:!hidden peer-invalid:block text-red-600">First Name Required</div>
            </label>
            <label className="flex flex-col gap-1 my-1">Last Name
              <input
                id='lastName'
                className="peer p-2 rounded border border-slate-400"
                type="text"
                name="lastName"
                required={true}
                placeholder="Last Name"
              />
              <div className="hidden peer-placeholder-shown:!hidden peer-invalid:block text-red-600">Last Name Required</div>
            </label>
            <label className="flex flex-col gap-1 my-1">Shop Name (optional)
              <input
                id='shopName'
                className="p-2 rounded border border-slate-400"
                type="text"
                name="shopName"
                placeholder="Shop Name"
              />
            </label>
            <label className="flex flex-col gap-1 my-1">Email
              <input
                id='email'
                className="peer p-2 rounded border border-slate-400"
                type="email"
                name="email"
                required={true}
                placeholder="Email"
              />
              <div className="hidden peer-placeholder-shown:!hidden peer-invalid:block text-red-600">Email Required</div>
            </label>
            <label className="flex flex-col gap-1 my-1">Password
              <input
                id='password'
                className="peer p-2 rounded border border-slate-400"
                type="password"
                name="password"
                placeholder="Password"
                required={true}
              />
              <div className="hidden peer-placeholder-shown:!hidden peer-invalid:block text-red-600">Password must be 8 characters and contain special characters</div>
            </label>
            <button className="text-white bg-sky-700 self-center px-1 py-1 rounded mt-4">
              Submit
            </button>
          </Form>
      </div>
    </main>
  );
};
