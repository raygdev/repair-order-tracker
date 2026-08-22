import { PartsRepositoryPort, BaseUseCase } from "../../domain";
import { partsService } from "../../adapters/parts.service";

export class PartDeleteUseCase extends BaseUseCase<string, Promise<boolean>> {
  constructor(private repo: PartsRepositoryPort) {
    super();
  }
  execute(id: string) {
    return this.repo.deletePart(id);
  }
}

export const partDelete = new PartDeleteUseCase(partsService)
