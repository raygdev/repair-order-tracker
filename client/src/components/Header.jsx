import React from "react";
import { NavLink } from "react-router-dom";
import Logout from "./Logout";
import { useAuth } from "../hooks/useAuth";

export default function Header(props) {
  const auth = useAuth()

  function activeLink({ isActive }) {
    return isActive ? 'p-4 underline underline-offset-4' : 'p-4'
  }

  let toggleLogin = !auth ? (
    <Link
      to="login"
      className={activeLink}
    >
      Login
    </Link>
  ) : (
    <Logout />
  );
  let toggleHome = auth ? `user/${auth.id}` : "/";

  return (
    <header className="p-4 bg-sky-700 flex sticky top-0 min-w-max text-white font-semibold">
      <nav className="flex basis-full justify-around">
        <Link
          to={toggleHome}
          className={activeLink}
        >
          Home
        </Link>
        {toggleLogin}
        {!localStorage.getItem("token") && (
          <Link
            to="register"
            className={activeLink}
          >
            Register
          </Link>
        )}
        <Link
          to="about"
          className={activeLink}
        >
          About
        </Link>
      </nav>
    </header>
  );
}
