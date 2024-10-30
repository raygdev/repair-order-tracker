import { client } from "../../../utils/url";
import { authService } from "../../auth";

export async function editRepair(repair) {
  const res = await client.put(`/api/repairorder/${repair.id}`, repair);

  if (res.statusText >= 400) {
    authService.logout()
    throw res.data;
  }

  return true;
}
