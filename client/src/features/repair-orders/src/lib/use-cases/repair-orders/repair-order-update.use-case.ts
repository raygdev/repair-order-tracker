import {
  type Repair,
  RepairOrderRepositoryPort,
  BaseUseCase,
} from "../../domain";

export class RepairOrderUpdateUseCase extends BaseUseCase<
  Repair,
  Promise<boolean>
> {
  constructor(private repo: RepairOrderRepositoryPort) {
    super();
  }
  async execute(repair: Repair) {
    return this.repo.updateRepair(repair);
  }
}
