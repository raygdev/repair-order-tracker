import { type CreateJob, JobRepositoryPort, BaseUseCase } from "../../domain";

export class JobCreateUseCase extends BaseUseCase<CreateJob, Promise<boolean>> {
  constructor(private repo: JobRepositoryPort) {
    super();
  }
  execute(job: CreateJob) {
    return this.repo.createJob(job);
  }
}