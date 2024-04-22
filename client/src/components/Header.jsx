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
    <NavLink
      to="login"
      className={activeLink}
    >
      Login
    </NavLink>
  ) : (
    <Logout />
  );
  let toggleHome = auth ? `user/${auth.id}` : "/";

  return (
    <header className="p-4 bg-sky-700 flex sticky top-0 min-w-max text-white font-semibold">
      <nav className="flex basis-full justify-around">
        <NavLink
          to={toggleHome}
          className={activeLink}
        >
          Home
        </NavLink>
        {toggleLogin}
        {!auth && (
          <NavLink
            to="register"
            className={activeLink}
          >
            Register
          </NavLink>
        )}
        {!auth && (<NavLink
          to="about"
          className={activeLink}
        >
          About
        </NavLink>
        )}
      </nav>
    </header>
  );
}
