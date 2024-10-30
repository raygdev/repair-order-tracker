import { client } from "../../../utils/url";
import { authService } from "../../auth";

export async function  createRepair(repair) {
  const res = await client.post('/api/repairorder', repair)
  
  if(res.status === 401) {
    authService.logout()
    throw res.data
  }
  
  if(res.status >= 400) {
    throw res.data
  }

  return true
}