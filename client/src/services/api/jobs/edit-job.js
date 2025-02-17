import { client } from "../../../utils/url";
import { authService } from "../../auth";

export async function editJob(info) {
    const response = await client.patch(`/api/jobs/${info.id}`, info)

    if(response.status === 401) {
        authService.logout()
        throw response.data
    }

    const job = response.data

    return job
} 