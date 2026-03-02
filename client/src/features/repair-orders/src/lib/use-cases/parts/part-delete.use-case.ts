import { PartsRepositoryPort, BaseUseCase } from "../../domain";

export class PartDeleteUseCase extends BaseUseCase<string, Promise<boolean>> {
  constructor(private repo: PartsRepositoryPort) {
    super();
  }
  execute(id: string) {
    return this.repo.deletePart(id);
  }
}
