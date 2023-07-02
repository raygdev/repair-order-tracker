import { redirect } from "react-router-dom";
import { getToken, setToken, clearToken } from "./token";


export async function verifyUser(userObject) {
  const res = await fetch("/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userObject),
  });

  if (!res.ok) {
    throw await res.json();
  }
  const user = await res.json();

  setToken(user.token);

  return redirect(`/user/${user._id}`);
}

export async function createNewUser(userObj) {
  const res = await fetch("/api/register/user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userObj),
  });

  if (!res.ok) {
    throw await res.json();
  }

  console.log("new user created successfully");
  return redirect("/login");
}

export async function deleteRepairOrder(id, userId) {
  const res = await fetch(`/repairorder/${id}`, {
    method: "delete",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  if (!res.ok) {
    if(res.status === 401) {
      clearToken()
      return
    } else {
      throw res;
    }
  }

  return redirect(`/user/${userId}`);
}

export async function createRO(ro, userId) {
  const res = await fetch("/repairorder", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(ro),
  });

  if (!res.ok) {
    if(res.status === 401){
      clearToken()
      return;
    }
    throw await res.json();
  }
  return redirect(`/user/${ro.userId}`);
}

export async function editRO(updatedRO, userId) {
  const res = await fetch(`/repairorder/${updatedRO.id}`, {
    method: "put",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(updatedRO),
  });

  if (!res.ok) {
    if(res.status === 401){
      clearToken()
      return
    } else {
      throw res;
    }
  }

  return redirect(`/user/${userId}/repairorder/${updatedRO._id}?vin=${updatedRO.vin}`);
}

export async function getUser(userId) {
  const res = await fetch(`/api/user/${userId}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  if (!res.ok) {
    if (res.status === 401) {
      clearToken()
      return redirect("/login");
    } else {
      throw await res.json();
    }
  }

  const user = await res.json();
  return user;
}

export async function getVehicle(vin){
  let res = await fetch(`/api/vehicle/${vin}`)
  let vehicle =  await res.json()
  if(!res.ok){
    return vehicle.message
  }
  return vehicle
}
