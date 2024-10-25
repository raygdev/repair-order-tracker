// import { authHeaders } from "../../../utils/crud";
import { client } from "../../../utils/url";

export async function deleteRepair(id) {
  const res = await client.delete(`/api/repairorder/${id}`);

  if (res.status === 401) {
    return false;
  }

  if (res.status >= 400) {
    throw res.data;
  }

  return true;
}
