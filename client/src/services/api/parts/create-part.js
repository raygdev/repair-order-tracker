import { client } from "../../../utils/url";
import { authService } from "../../auth";

export async function createPart(part) {
    const response = await client.post('/api/parts/create', part)

    if(response.status === 401) {
        authService.logout()
        throw response.data
    }

    const createdPart = response.data

    return createdPart
}