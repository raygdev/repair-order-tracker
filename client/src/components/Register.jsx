import React from "react";
import { Form, redirect } from "react-router-dom";

export default function Register (props) {
  return (
    <div className="flex  flex-col m-auto">
      <h2 className="text-2xl mb-1 self-center text-emerald-800 font-extrabold">Please Register!</h2>
      <p className="text-sm self-center font-medium">It's Free!</p>
    <Form
      className="p-4 h-80 flex flex-col bg-sky-500 justify-between rounded shadow-lg shadow-slate-500"
      method="post"
      action="../register"
    >
      <input
        className="p-1 rounded"
        type="text"
        name="firstName"
        required={true}
        placeholder="First Name"
      />
      <input
        className="p-1 rounded"
        type="text"
        name="lastName"
        required={true}
        placeholder="Last Name"
      />
      <input
        className="p-1 rounded"
        type="text"
        name="shop_name"
        placeholder="Shop Name"
      />
      <input
        className="p-1 rounded"
        type="email"
        name="email"
        required={true}
        placeholder="Enter your email"
      />
      <input
        className="p-1 rounded"
        type="password"
        name="password"
        placeholder="Create a Password"
      />
      <button className="text-white bg-sky-700 self-center px-1 py-1 rounded">
        Submit
      </button>
    </Form>
    </div>
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
