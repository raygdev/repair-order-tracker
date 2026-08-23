import { type Job, JobRepositoryPort, BaseUseCase } from "../../domain";
import { jobService } from "../../adapters/job.service";

export class JobUpdateUseCase extends BaseUseCase<Job, Promise<Job>> {
  constructor(private repo: JobRepositoryPort) {
    super();
  }
  execute(job: Job) {
    return this.repo.updateJob(job);
  }
}

export const jobUpdate = new JobUpdateUseCase(jobService);