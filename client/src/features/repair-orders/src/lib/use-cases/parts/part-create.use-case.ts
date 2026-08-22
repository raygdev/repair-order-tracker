import { type CreatePart, PartsRepositoryPort, BaseUseCase } from "../../domain";
import { partsService } from "../../adapters/parts.service";

export class PartCreateUseCase extends BaseUseCase<CreatePart, Promise<boolean>> {
  constructor(private repo: PartsRepositoryPort) {
    super();
  }
  execute(part: CreatePart) {
    return this.repo.createPart(part);
  }
}

export const partCreate = new PartCreateUseCase(partsService)
