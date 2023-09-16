import { redirect } from "react-router-dom";
import { getToken, setToken, clearToken } from "./token"
import { handleNotOK } from "./handleNotOK"

function authHeaders() {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getToken()}`
  }
}

export async function verifyUser(userObject) {
  const res = await fetch("/api/login", {
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
  const res = await fetch("/api/register/user", {
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

export async function deleteRepairOrder(id) {
  const res = await fetch(`/repairorder/${id}`, {
    method: "delete",
    headers: authHeaders()
  })
  const success = await res.json()
  if (!res.ok) {
    return handleNotOK(res, success)
  }
  return true
}

export async function createRO(ro) {
  const res = await fetch("/repairorder", {
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

export async function editRO(updatedRO) {
  const res = await fetch(`/repairorder/${updatedRO.id}`, {
    method: "put",
    headers: authHeaders(),
    body: JSON.stringify(updatedRO)
  })
  const data = await res.json()

  if (!res.ok) {
    return handleNotOK(res, data)
  }

  return true
}

export async function getUser(userId) {
  const res = await fetch(`/api/user/${userId}`, {
    headers: authHeaders()
  })
  const user = await res.json()

  if (!res.ok) {
    return handleNotOK(res, user)
  }
  return user
}

export async function getVehicle(vin) {
  let res = await fetch(`/api/vehicle/${vin}`)
  let vehicle = await res.json()
  if (!res.ok) {
    return vehicle.message
  }
  return vehicle
}

export async function verifyToken() {
  if (!getToken()) return false

  const res = await fetch("/verify-token", {
    method: "POST",
    headers: authHeaders()
  })

  if (!res.ok) {
    clearToken()
    return false
  }

  return true
}
