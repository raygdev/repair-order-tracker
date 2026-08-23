import { JobRepositoryPort, BaseUseCase } from "../../domain";
import { jobService } from "../../adapters/job.service";

export class JobDeleteUseCase extends BaseUseCase<string, Promise<boolean>> {
  constructor(private repo: JobRepositoryPort) {
    super();
  }
  execute(id: string) {
    return this.repo.deleteJob(id);
  }
}

export const jobDelete = new JobDeleteUseCase(jobService)