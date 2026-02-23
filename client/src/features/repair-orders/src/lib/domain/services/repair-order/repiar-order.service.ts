import { client } from "@features/utils/url";

import { authService } from "@services/auth";
import type { RepairOrder } from "../../models/repair-order.models";

interface PartialRepair extends Partial<Omit<RepairOrder, "vehicle" | "job">> {}
export interface Repair extends PartialRepair {}

export interface RepairCreate extends Omit<
  RepairOrder,
  "id" | "_id" | "vehicle" | "job" | "status"
> {
  status?: RepairOrder["status"];
}

class RepairOrderService {
  constructor(
    private api: typeof client,
    private auth: typeof authService,
  ) {}

  async updateRepair(repair: Repair) {
    const res = await this.api.put<RepairOrder, any, Repair>(
      `/api/repairorder/${repair.id}`,
      repair,
    );

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
    const res = await this.api.post<RepairOrder>("/api/repairorder", repair);

    if (res.status === 401) {
      this.auth.logout();
      throw new Error("Not Authorized");
    }

    if (res.status >= 400) {
      throw new Error("Something went wrong. Please try again.");
    }

    return true;
  }

  async getRepairOrders() {
    const res = await client.get("/api/repairorders");

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
    const res = await client.delete(`/api/repairorder/${id}`);

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
