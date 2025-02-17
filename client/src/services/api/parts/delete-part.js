import { client } from "../../../utils/url";
import { authService } from "../../auth";

export async function deletePart(id) {
    const response = await client.delete(`/api/parts/${id}`)

    if(response.status === 401) {
        authService.logout()
        throw response.data
    }

    const part = response.data

    return part
}