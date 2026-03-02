import { client } from "@features/utils/url";
import { authService } from "@services/auth";

import {
  type RepairOrder,
  type RepairCreate,
  type Repair,
  RepairOrderRepositoryPort
} from '../domain'


class RepairOrderService extends RepairOrderRepositoryPort{
  constructor(
    private api: typeof client,
    private auth: typeof authService,
    
  ) {
    super()
  }

  async updateRepair(repair: Repair) {
    const res = await this.api.put<RepairOrder, any, Repair>(`${this.baseUrl}/${repair.id}`, repair);

    if (res.status === 401) {
      this.auth.logout();
      throw new Error("Not Authorized");
    }

    if (res.status >= 200 || res.status <= 299) {
      return true;
    }

    throw new Error("Something went wrong");
  }

  async createRepair(repair: RepairCreate) {
    const res = await this.api.post<RepairOrder>(this.baseUrl, repair);

    if (res.status === 401) {
      this.auth.logout();
      throw new Error("Not Authorized");
    }

    if (res.status >= 400) {
      throw new Error("Something went wrong. Please try again.");
    }

    return true;
  }

  async getAllRepairOrders() {
    const res = await this.api.get(this.baseUrl);

    if (res.status === 401) {
      authService.logout();
      throw new Error("Not Authorized");
    }

    if (res.status >= 400) {
      throw new Error("Something went wrong. Please try again.");
    }

    const repairs = res.data;

    return repairs;
  }

  async deleteRepair(id: string) {
    const res = await this.api.delete(`${this.baseUrl}/${id}`);

    if (res.status === 401) {
      authService.logout();
      throw new Error("Not Authorized");
    }

    if (res.status >= 400) {
      throw new Error("Something went wrong. Please try again.");
    }

    return true;
  }
}

export const repairOrderService = new RepairOrderService(client, authService);
