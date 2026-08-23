import {
  type RepairOrderStatusUpdate,
  RepairOrderRepositoryPort,
  BaseUseCase,
} from "../../domain";

export class RepairOrderStatusUpdateUseCase extends BaseUseCase<
  RepairOrderStatusUpdate,
  Promise<boolean>
> {
  constructor(private repo: RepairOrderRepositoryPort) {
    super();
  }

  execute(update: RepairOrderStatusUpdate) {
    return this.repo.updateRepairStatus(update);
  }
}
