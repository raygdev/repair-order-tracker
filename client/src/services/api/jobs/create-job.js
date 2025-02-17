import { client } from "../../../utils/url";
import { authService } from "../../auth";

export async function createJob(job) {
    const response = await client.post('/api/jobs/create', job)

    if(response.status === 401) {
        authService.logout()
        throw response.data
    }

    const newJob = response.data

    return newJob
}
