import React from "react";
import { NavLink } from "react-router-dom";
import Logout from "./Logout";
import { useAuth } from "../hooks/useAuth";

export default function Header(props) {
  const auth = useAuth()

  function activeLink({ isActive }) {
    return isActive ? 'p-4 underline underline-offset-4' : 'p-4'
  }

  const links = [
    !auth && { to: '/', name: 'Home'},
    !auth && { to: 'login', name: 'Login'},
    !auth && { to: 'register', name: 'Register'},
    !auth && { to: 'about', name: 'About'},
    auth && { to: 'dashboard', name: 'Home'}
  ]

  return (
    <header className="p-4 bg-ro-slate-900 flex justify-end sticky top-0 min-w-max text-ro-slate-100 font-semibold">
      <nav className="flex">
        { links
            .filter(link => link)
            .map(
              (link,i) => <NavLink className={activeLink} to={link.to} key={i}>{link.name}</NavLink>
            )
        }
        { auth && <Logout/> }
      </nav>
    </header>
  );
}
