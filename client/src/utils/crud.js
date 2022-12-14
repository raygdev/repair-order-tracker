import { redirect } from "react-router-dom";
let token;

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

  localStorage.setItem("token", user.token);

  token = localStorage.getItem('token')

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

export async function deleteRepairOrder(ids) {
  const res = await fetch("/repairorder", {
    method: "delete",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(ids),
  });

  if (!res.ok) {
    throw res;
  }

  return redirect(`/user/${ids.userId}`);
}

export async function createRO(ro, userId) {
  const res = await fetch("/repairorder", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(ro),
  });

  if (!res.ok) {
    throw await res.json();
  }
  return redirect(`/user/${userId}`);
}

export async function editRO(updatedRO, userId) {
  const res = await fetch("/repairorder", {
    method: "put",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updatedRO),
  });

  if (!res.ok) {
    throw res;
  }

  return redirect(`/user/${userId}/repairorder/${updatedRO._id}`);
}

export async function getUser(userId) {
  const res = await fetch(`/api/user/${userId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  if (res.status === 401) {
    return redirect("/login");
  }
  if (!res.ok) {
    throw await res.json();
  }

  const user = await res.json();
  return user;
}
