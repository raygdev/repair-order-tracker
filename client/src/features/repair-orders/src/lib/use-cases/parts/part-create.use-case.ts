import { type CreatePart, PartsRepositoryPort, BaseUseCase } from "../../domain";

export class PartCreateUseCase extends BaseUseCase<CreatePart, Promise<boolean>> {
  constructor(private repo: PartsRepositoryPort) {
    super();
  }
  execute(part: CreatePart) {
    return this.repo.createPart(part);
  }
}
