import {
  repairOrderService,
  type RepairCreate,
  type Repair,
} from "./repiar-order.service";

export class RepairOrderActions {
  constructor(private repairService: typeof repairOrderService) {}

  async post(repair: RepairCreate) {
    return await this.repairService.createRepair(repair);
  }

  async put(repair: Repair) {
    return await this.repairService.updateRepair(repair);
  }

  async getAll() {
    return this.repairService.getRepairOrders();
  }

  async delete(id: string) {
    return this.repairService.deleteRepair(id);
  }
}

export const repairOrderActions = new RepairOrderActions(repairOrderService);
