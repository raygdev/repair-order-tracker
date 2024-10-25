import { client } from "../../../utils/url";

export async function getUserRepairOrders() {
  const res = await client.get("/api/repairorders");

  if (res.status >= 400) throw await res.data;

  const repairs = res.data;

  return repairs;
}
