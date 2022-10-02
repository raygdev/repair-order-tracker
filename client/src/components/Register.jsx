import React, { useState, useEffect } from "react";
import "../css/registerForm.css";
import { registrationFormInit } from "../utils/registerInit";

export const Register = (props) => {
  const [newUser, setNewUser] = useState(registrationFormInit);
  const [error, setError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isLoading) {
      fetch("/api/register/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      })
        .then((res) => {
          if (!res.ok) {
            throw res.json();
          } else {
            return res.json();
          }
        })
        .then((data) => {
          console.log(data.message);
          console.log(data.you)
          console.log("came here second then block");
          setIsLoading(false);
          setIsSubmitted(true);
          setNewUser(registrationFormInit)
        })
        .catch((e) => {
          e.then((result) => {
            console.log(result.error);
            setError(result.error);
            setIsLoading(false);
          });
          console.log("came here for error handling catch");
        });
    }
  }, [isLoading]);

  function handleChange(e) {
    let { name, value } = e.target;
    setNewUser((prevUser) => {
      if (name === "name.first") {
        return {
          ...prevUser,
          name: {
            first: value,
            last: prevUser.name.last,
          },
        };
      } else if (name === "name.last") {
        return {
          ...prevUser,
          name: {
            first: prevUser.name.first,
            last: value,
          },
        };
      } else {
        return {
          ...prevUser,
          [name]: value,
        };
      }
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError('')
    setIsLoading(true);
  }

  const style = {
    display: error ? "block" : "none",
    color: "red",
    fontWeight: "bold",
  };

  const buttonStyle = {
    backgroundColor: isSubmitted ? "green" : "yellow",
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name={"name.first"}
        value={newUser.name.first}
        required={true}
        onChange={handleChange}
        placeholder="First Name"
      />
      <input
        type="text"
        name={"name.last"}
        value={newUser.name.last}
        required={true}
        onChange={handleChange}
        placeholder="Last Name"
      />
      <input
        type="text"
        name={"shop_name"}
        value={newUser.shop_name}
        onChange={handleChange}
        placeholder="Shop Name"
      />
      <input
        type="email"
        name={"email"}
        value={newUser.email}
        required={true}
        onChange={handleChange}
        placeholder="Enter your email"
      />
      <input
        type="password"
        name={"password"}
        value={newUser.password}
        onChange={handleChange}
        placeholder="Create a Password"
      />
      <button style={buttonStyle} disabled={isSubmitted || isLoading}>
        {isSubmitted ? "Success" : "Submit"}
      </button>
      <p style={style}>{error}</p>
    </form>
  );
};
