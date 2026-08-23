import { type CreateJob, JobRepositoryPort, BaseUseCase } from "../../domain";
import { jobService } from "../../adapters/job.service";

export class JobCreateUseCase extends BaseUseCase<CreateJob, Promise<boolean>> {
  constructor(private repo: JobRepositoryPort) {
    super();
  }
  execute(job: CreateJob) {
    return this.repo.createJob(job);
  }
}

export const jobCreate = new JobCreateUseCase(jobService);