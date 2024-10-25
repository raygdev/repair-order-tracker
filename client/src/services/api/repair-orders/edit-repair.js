// import { authHeaders } from "../../../utils/crud";
import { client } from "../../../utils/url";

export async function editRepair(repair) {
  const res = await client.put(`/api/repairorder/${repair.id}`, repair);

  if (res.statusText >= 400) {
    throw res.data;
  }

  return true;
}
