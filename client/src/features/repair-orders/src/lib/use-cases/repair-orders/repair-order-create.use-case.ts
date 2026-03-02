import {
  type RepairCreate,
  BaseUseCase,
  RepairOrderRepositoryPort,
} from "../../domain";

export class RepairOrderCreateUseCase extends BaseUseCase<
  RepairCreate,
  Promise<boolean>
> {
  constructor(private repo: RepairOrderRepositoryPort) {
    super();
  }
  async execute(value: RepairCreate): Promise<boolean> {
    return this.repo.createRepair(value);
  }
}
