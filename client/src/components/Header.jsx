import React from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import Logout from "./Logout";

export default function Header(props) {
  const { userId } = useParams();
  const location = useLocation();
  let toggleLogin = !localStorage.getItem("token") ? (
    <Link
      to="login"
      className={`p-4 ${
        location.pathname === "/login" ? "underline underline-offset-4" : ""
      }`}
    >
      Login
    </Link>
  ) : (
    <Logout />
  );
  let toggleHome = localStorage.getItem("token") ? `user/${userId}` : "/";

  return (
    <header className="p-4 bg-sky-700 flex sticky top-0 min-w-max text-white font-semibold">
      <nav className="flex basis-full justify-around">
        <Link
          to={toggleHome}
          className={`p-4 ${
            location.pathname === "/" ? "underline underline-offset-4" : ""
          }`}
        >
          Home
        </Link>
        {toggleLogin}
        {!localStorage.getItem("token") && (
          <Link
            to="register"
            className={`p-4 ${
              location.pathname === "/register"
                ? "underline underline-offset-4"
                : ""
            }`}
          >
            Register
          </Link>
        )}
        <Link
          to="about"
          className={`p-4 ${
            location.pathname === "/about" ? "underline underline-offset-4" : ""
          }`}
        >
          About
        </Link>
      </nav>
    </header>
  );
}
