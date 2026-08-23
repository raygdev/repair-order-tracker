import type { Job, JobStatus } from "../models/job.model";
import { BaseUrls } from "../types/base-url";

export interface CreateJob extends Omit<Job, 'id'> {
    repairId: string
}

export interface JobStatusUpdate {
    id: string
    status: JobStatus
}

export abstract class JobRepositoryPort {
    protected baseUrl = BaseUrls.JobsBaseUrl
    abstract createJob(job: CreateJob) : Promise<boolean>
    abstract deleteJob(id: string): Promise<boolean>
    abstract updateJob(job: Job): Promise<Job>
    abstract updateJobStatus(update: JobStatusUpdate): Promise<Job>
}