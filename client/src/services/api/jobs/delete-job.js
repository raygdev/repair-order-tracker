import { client } from "../../../utils/url";
import { authService } from "../../auth";

export async function deleteJob(id) {
    const response = await client.delete(`/api/jobs/${id}`)

    if(response.status === 401) {
        authService.logout()
        throw response.data
    }

    const job = response.data

    return job
}