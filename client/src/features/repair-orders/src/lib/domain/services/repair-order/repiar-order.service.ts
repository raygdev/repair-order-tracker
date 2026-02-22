import { client } from "@features/utils/url";

import { authService } from "@services/auth";
import type { RepairOrder } from "../../models/repair-order.models";

interface PartialRepair extends Partial<Omit<RepairOrder, 'vehicle' | 'job'>>{}
interface Repair extends PartialRepair {}

class RepairOrderService {
    constructor(
      private api: typeof client,
      private auth: typeof authService
    ){}

    async updateRepair(repair: Repair) {
      const res = await this.api.put<RepairOrder, any, Repair>(`/api/repairorder/${repair.id}`, repair)

      if(res.status === 401) {
        this.auth.logout()
        throw new Error('Not Authorized')
      }

      if(res.status >= 200 || res.status <= 299) {
        return true
      }

      throw new Error('Something went wrong')
    }
}


export const repairOrderService = new RepairOrderService(client, authService)

