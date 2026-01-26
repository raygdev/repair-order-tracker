
import { NavLink } from "react-router-dom";
import Logout from "./Logout.jsx";
import { useAuth } from "../hooks/useAuth";

export default function Header() {
   const auth = useAuth()

  function activeLink({ isActive }: { isActive: boolean }) {
    return isActive ? 'p-4 underline underline-offset-4' : 'p-4'
  }

  const links = [
    !auth?.isAuth && { to: '/', name: 'Home'},
    !auth?.isAuth && { to: 'login', name: 'Login'},
    !auth?.isAuth && { to: 'register', name: 'Register'},
    !auth?.isAuth && { to: 'about', name: 'About'},
    auth?.isAuth && { to: 'dashboard', name: 'Home'}
  ]

  return (
    <header className="p-4 bg-ro-slate-900 flex justify-end sticky top-0 min-w-max text-ro-slate-100 font-semibold">
      <nav className="flex">
        { links
            .filter(link => link !== false)
            .map(
              (link,i) => <NavLink className={activeLink} to={link?.to} key={i}>{link?.name}</NavLink>
            )
        }
        { auth?.isAuth && <Logout/> }
      </nav>
    </header>
  );
}
