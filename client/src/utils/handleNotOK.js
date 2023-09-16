import { clearToken } from "./token"

export function handleNotOK(res,data) {
    if(res.status === 401) {
        clearToken()
        return
      } else {
        throw {
          status: res.status,
          text: res.statusText,
          message: data.message
        }
      }
}