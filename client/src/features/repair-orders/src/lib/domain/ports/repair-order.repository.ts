import type { RepairOrder } from "../models/repair-order.models";
import { BaseUrls } from "../types/base-url";

interface PartialRepair extends Partial<Omit<RepairOrder, "vehicle" | "job">> {}
export interface Repair extends PartialRepair {}

export interface RepairCreate extends Omit<
  RepairOrder,
  "id" | "_id" | "vehicle" | "job" | "status"
> {
  status?: RepairOrder["status"];
}

export abstract class RepairOrderRepositoryPort {
    protected baseUrl = BaseUrls.RepairOrderBaseUrl;
    abstract createRepair(repair: RepairCreate): Promise<boolean>
    abstract updateRepair(repair: Repair): Promise<boolean>
    abstract getAllRepairOrders(): Promise<RepairOrder[]>
    abstract deleteRepair(id: string): Promise<boolean>
}