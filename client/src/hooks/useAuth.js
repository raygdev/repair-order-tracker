import { useRouteLoaderData } from "react-router-dom";

export function useAuth() {
  const user = useRouteLoaderData('root')

  return user
}