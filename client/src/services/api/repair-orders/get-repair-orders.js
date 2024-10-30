import { client } from "../../../utils/url";
import { authService } from "../../auth";

export async function getUserRepairOrders() {
  const res = await client.get("/api/repairorders");

  if (res.status === 401) {
    authService.logout()
    throw await res.data
  }

  if(res.status >= 400) {
    throw await res.data
  }
  
  const repairs = res.data;

  return repairs;
}
