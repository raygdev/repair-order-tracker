import React from "react";
import "../css/registerForm.css";
import { Form } from 'react-router-dom'
import { registerSubmission } from "../utils/registerSubmit";

export const Register = (props) => {

  const buttonStyle = {
    backgroundColor: "yellow",
  };
  


  return (
    <Form className="register-form" method='post' action='../login'>
      <input
        type="text"
        name='firstName'
        required={true}
        placeholder="First Name"
      />
      <input
        type="text"
        name="lastName"
        required={true}
        placeholder="Last Name"
      />
      <input
        type="text"
        name="shop_name"
        placeholder="Shop Name"
      />
      <input
        type="email"
        name="email"
        required={true}
        placeholder="Enter your email"
      />
      <input
        type="password"
        name="password"
        placeholder="Create a Password"
      />
      <button style={buttonStyle}>
         "Submit"
      </button>
    </Form>
  );
};
export async function redirectOnRegisterSuccess({request}){
       const user =  await request.body
       console.log(user)
       return
       
}

export async function handleAction({request}){
  const user = await request.formData()
  // console.log(user)
  const newUser={
    name:{
      first:user.get('firstName'),
      last:user.get('lastName')
    },
    email:user.get('email'),
    password:user.get('password'),
    shop_name:user.get('shop_name')
  }
  console.log(JSON.stringify(newUser))
  return newUser

}