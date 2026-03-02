import {
  type RepairOrder,
  RepairOrderRepositoryPort,
  BaseUseCase,
} from "../../domain";

export class RepairOrderGetAllUseCase extends BaseUseCase<
  null,
  Promise<RepairOrder[]>
> {
  constructor(private repo: RepairOrderRepositoryPort) {
    super();
  }
  async execute(_: null) {
    return this.repo.getAllRepairOrders();
  }
}
