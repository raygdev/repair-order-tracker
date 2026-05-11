import type { Job } from "../models/job.model";
import { BaseUrls } from "../types/base-url";

export interface CreateJob extends Omit<Job, 'id'> {}

export abstract class JobRepositoryPort {
    protected baseUrl = BaseUrls.JobsBaseUrl
    abstract createJob(job: CreateJob) : Promise<boolean>
    abstract deleteJob(id: string): Promise<boolean>
    abstract updateJob(job: Job): Promise<Job>
}