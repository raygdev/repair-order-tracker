import { client } from "@features/utils/url";
import { authService } from "@services/auth";
import {
    type CreateJob,
    type Job,
    JobRepositoryPort
} from '../domain'

class JobService extends JobRepositoryPort {
    constructor(
        private auth: typeof authService,
        private api: typeof client
    ) {
        super()
    }

    async createJob(job: CreateJob): Promise<boolean> {
        const newJob = await this.api.post(`${this.baseUrl}/create`)

        if(newJob.status === 401) {
          this.auth.logout()
          throw new Error('Not Authorized')
        }

        if(newJob.status === 200) {
            return true
        }

        throw new Error('Something went wrong, please try again!')
    }

    async deleteJob(id: string): Promise<boolean> {
        const res = await this.api.delete(`${this.baseUrl}/jobs/${id}`)

        if(res.status === 401) {
            this.auth.logout()
            throw new Error('Not Authorized')
        }

        if(res.status === 200) {
            return true
        }

        throw new Error('Something went wrong, please try agian!')
    }

    async updateJob(job: Job): Promise<Job> {
        const updatedJob = await this.api.patch<Job>(`${this.baseUrl}/jobs/${job.id}`)

        if(updatedJob.status === 401) {
            this.auth.logout()
            throw new Error('Not Authorized')
        }

        if(updatedJob.status === 200) {
            return updatedJob.data
        }

        throw new Error('Something went wrong, please try agian!')
    }

}