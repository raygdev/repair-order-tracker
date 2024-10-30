import { client } from "../../../utils/url";
import { authService } from "../../auth";

export async function deleteRepair(id) {
  const res = await client.delete(`/api/repairorder/${id}`);

  if (res.status === 401) {
    authService.logout()
    return false;
  }

  if (res.status >= 400) {
    throw res.data;
  }

  return true;
}
