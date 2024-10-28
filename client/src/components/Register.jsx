import React from "react";
import { Form, useActionData, useNavigation } from "react-router-dom";

export default function Register(props) {
  const navigation = useNavigation();
  const inputs = useActionData();
  const inputValues = [
    { labelName: "First Name", name: "firstName", type: "text" },
    { labelName: "Last Name", name: "lastName", type: "text" },
    { labelName: "Shop Name (optional)", name: "shopName", type: "text" },
    { labelName: "Email", name: "email", type: "text" },
    { labelName: "Password", name: "password", type: "password" },
  ];
  return (
    <main className=" flex w-full flex-col min-h-screen text-ro-slate-900">
      <div className="w-full xs:max-w-md m-auto px-4">
        <Form
          className="p-4 min-h-max flex flex-col justify-between rounded shadow-form"
          method="post"
          action="../register"
        >
          <div className="mb-4 text-center">
            <h2 className="text-2xl mb-1 self-center font-extrabold">
              Register
            </h2>
            <p className="text-sm self-center font-medium">
              It's <span>Free</span>!
            </p>
          </div>
          {inputs && !inputs.isValid && (
            <span className="text-red-700">Please check your information!</span>
          )}
          <div className="flex flex-col gap-3">
            {inputValues.map((input, i) => {
              return (
                <label key={i} className="flex flex-col gap-2 my-1">
                  {input.labelName}
                  <input
                    className={`p-2 rounded ${
                      inputs && inputs.firstName.isInvalid
                      ? "border-2 border-red-600"
                      : "border-2 border-ro-slate-300"
                    }`}
                    type={input.type}
                    name={input.name}
                    placeholder={input.labelName}
                  />
                  {inputs && inputs[input.name].isInvalid && (
                    <div className=" text-red-600">
                      {inputs[input.name].message}
                    </div>
                  )}
                </label>
              );
            })}
            <button
              className="text-ro-slate-100 hover:bg-ro-link-hover disabled:bg-ro-link-disable bg-ro-link-primary self-center px-6 py-2 transition-all rounded mt-4 focus:ring-2"
              disabled={navigation.state !== "idle"}
            >
              {navigation.state === "idle" ? "Submit" : "Submitting"}
            </button>
          </div>
        </Form>
      </div>
    </main>
  );
}
