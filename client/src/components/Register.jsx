import React from "react";
import "../css/registerForm.css";
import { Form, redirect } from "react-router-dom";
import { registerSubmission } from "../utils/registerSubmit";

export const Register = (props) => {
  const buttonStyle = {
    backgroundColor: "yellow",
  };

  return (
    <Form className="register-form" method="post" action="../register">
      <input
        type="text"
        name="firstName"
        required={true}
        placeholder="First Name"
      />
      <input
        type="text"
        name="lastName"
        required={true}
        placeholder="Last Name"
      />
      <input type="text" name="shop_name" placeholder="Shop Name" />
      <input
        type="email"
        name="email"
        required={true}
        placeholder="Enter your email"
      />
      <input type="password" name="password" placeholder="Create a Password" />
      <button style={buttonStyle}>"Submit"</button>
    </Form>
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
  console.log(user);
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
    console.log(res.message ?? res.message);
    throw await res.json();
    redirect("/register");
  }

  const newUser = await res.json();
  return redirect("/login");
}
