// import { useRouteLoaderData } from "react-router-dom";
import { useContext } from "react";
import { AuthContext, type UserAuthContext } from "../provider/useAuthProvider.jsx";

export function useAuth(): UserAuthContext {
  const auth  = useContext(AuthContext) as UserAuthContext
  return auth
}