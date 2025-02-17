import { client } from "../../../utils/url";
import { authService } from "../../auth";

export async function updatePart(info) {
    const response = await client.patch(`/api/parts/${info.id}`, info)

    if(response.status === 401) {
        authService.logout()
        throw response.data
    }

    const part = response.data

    return part
}