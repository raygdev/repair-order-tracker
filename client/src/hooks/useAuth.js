// import { useRouteLoaderData } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../provider/useAuthProvider";

export function useAuth() {
  const { auth } = useContext(AuthContext)
  return auth
}