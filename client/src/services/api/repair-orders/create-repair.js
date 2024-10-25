// import { authHeaders } from "../../../utils/crud";
import { client } from "../../../utils/url";

export async function  createRepair(repair) {
  const res = await client.post('/api/repairorder', repair)
  
  if(res.status === 401) {
    throw res.data
  }
  
  if(res.statusText !== 'OK') {
    throw res.data
  }

  return true
}