import { JobRepositoryPort, BaseUseCase } from "../../domain";

export class JobDeleteUseCase extends BaseUseCase<string, Promise<boolean>> {
  constructor(private repo: JobRepositoryPort) {
    super();
  }
  execute(id: string) {
    return this.repo.deleteJob(id);
  }
}