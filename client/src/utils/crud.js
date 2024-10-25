import { getToken, setToken, clearToken } from "./token"
import { handleNotOK } from "./handleNotOK"
import { url } from './url'

function authHeaders() {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getToken()}`
  }
}

export async function verifyUser(userObject) {
  const res = await fetch(`${url}/api/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userObject)
  })

  if (!res.ok) {
    throw await res.json()
  }
  const user = await res.json()

  setToken(user.token)

  return user
}

export async function createNewUser(userObj) {
  const res = await fetch(`${url}/api/register/user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(userObj)
  })
  const success = await res.json()
  if (!res.ok) {
    return handleNotOK(res, success)
  }
  return true
}

export async function createRO(ro) {
  const res = await fetch(`${url}/api/repairorder`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(ro)
  })
  const data = await res.json()

  if (!res.ok) {
    return handleNotOK(res, data)
  }
  return true
}


export async function getUser(userId) {
  const res = await fetch(`${url}/api/user`, {
    headers: authHeaders()
  })
  const user = await res.json()

  if (!res.ok) {
    return handleNotOK(res, user)
  }
  return user
}

export async function getVehicle(vin) {
  let res = await fetch(`${url}/api/vehicle/${vin}`)
  let vehicle = await res.json()
  if (!res.ok) {
    return vehicle.message
  }
  return vehicle
}

export async function verifyToken() {
  if (!getToken()) return false

  const res = await fetch(`${url}/verify-token`, {
    method: "POST",
    headers: authHeaders()
  })

  if (!res.ok) {
    clearToken()
    return false
  }

  return true
}
