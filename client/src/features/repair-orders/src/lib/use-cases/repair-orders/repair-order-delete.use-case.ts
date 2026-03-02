import { RepairOrderRepositoryPort, BaseUseCase } from "../../domain";

export class RepairOrderDeleteUseCase extends BaseUseCase<
  string,
  Promise<boolean>
> {
  constructor(private repo: RepairOrderRepositoryPort) {
    super();
  }
  execute(id: string) {
    return this.repo.deleteRepair(id);
  }
}
