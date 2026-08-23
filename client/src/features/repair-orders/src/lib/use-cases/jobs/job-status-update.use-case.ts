import { type Job, type JobStatusUpdate, JobRepositoryPort, BaseUseCase } from "../../domain";

export class JobStatusUpdateUseCase extends BaseUseCase<JobStatusUpdate, Promise<Job>> {
  constructor(private repo: JobRepositoryPort) {
    super();
  }

  execute(update: JobStatusUpdate) {
    return this.repo.updateJobStatus(update);
  }
}
