import { clearToken } from "./token"

/**
 * 
 * @param {object} res the response object from a fetch request
 * @param {object} data the value of the awaited res.json
 * @returns early return if status is 401 else throw error
 */

export function handleNotOK(res,data) {
    if(res.status === 401) {
        clearToken()
        return
      } else {
        throw {
          status: res.status,
          statusText: res.statusText,
          message: data.message
        }
      }
}