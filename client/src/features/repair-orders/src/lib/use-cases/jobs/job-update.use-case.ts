import { type Job, JobRepositoryPort, BaseUseCase } from "../../domain";

export class JobUpdateUseCase extends BaseUseCase<Job, Promise<Job>> {
  constructor(private repo: JobRepositoryPort) {
    super();
  }
  execute(job: Job) {
    return this.repo.updateJob(job);
  }
}