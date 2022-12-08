import React from "react";
import { Form, redirect } from "react-router-dom";

export default function Register (props) {
  return (
    <main className=" flex w-full flex-col min-h-screen bg-gradient-to-br from-blue-800 via-sky-300">
        <div className="w-full xs:max-w-md m-auto">
          <Form
            className="p-4 min-h-max flex flex-col bg-sky-300 justify-between rounded shadow-lg shadow-slate-500"
            method="post"
            action="../register"
          >
            <div className="mb-4 text-center">
              <h2 className="text-2xl mb-1 self-center bg-gradient-to-r from-blue-900 to-blue-700 bg-clip-text text-transparent font-extrabold">Please Register!</h2>
              <p className="text-sm self-center font-medium">It's <span>Free</span>!</p>
            </div>
            <label htmlFor="firstName">First Name <span>*</span></label>
            <input
              id='firstName'
              className="p-1 rounded"
              type="text"
              name="firstName"
              required={true}
              placeholder="First Name"
            />
            <label htmlFor="lastName">Last Name <span>*</span></label>
            <input
              id='lastName'
              className="p-1 rounded"
              type="text"
              name="lastName"
              required={true}
              placeholder="Last Name"
            />
            <label htmlFor="shopName">Shop Name</label>
            <input
              id='shopName'
              className="p-1 rounded"
              type="text"
              name="shop_name"
              placeholder="Shop Name"
            />
            <label htmlFor="email">Email <span>*</span></label>
            <input
              id='email'
              className="p-1 rounded"
              type="email"
              name="email"
              required={true}
              placeholder="Email"
            />
            <label htmlFor="password">Password <span>*</span></label>
            <input
              id='password'
              className="p-1 rounded"
              type="password"
              name="password"
              placeholder="Password"
              required={true}
            />
            <button className="text-white bg-sky-700 self-center px-1 py-1 rounded mt-4">
              Submit
            </button>
          </Form>
      </div>
    </main>
  );
};
export async function redirectOnRegisterSuccess({ request }) {
  const user = await request.body;
  console.log(user);
  return;
}

export async function handleAction({ request }) {
  const formData = await request.formData();
  const user = Object.fromEntries(formData);
  const newUser = {
    name: {
      first: user.firstName,
      last: user.lastName,
    },
    email: user.email,
    password: user.password,
    shop_name: user.shop_name,
  };

  return createNewUser(newUser).catch((e) => console.log(e.message));
}

async function createNewUser(userObj) {
  const res = await fetch("/api/register/user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userObj),
  });

  if (!res.ok) {
    throw await res.json();
  }

  console.log('new user created successfully')
  return redirect("/login");
}
