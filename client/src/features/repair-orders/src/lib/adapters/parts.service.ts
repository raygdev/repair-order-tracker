import { client } from "@features/utils/url";
import { authService } from "@services/auth";
import {
  type CreatePart,
  type Part,
  PartsRepositoryPort
} from '../domain'


export class PartsSevice extends PartsRepositoryPort {

    constructor(
        private auth: typeof authService,
        private api: typeof client
    ) {
        super()
    }

    async createPart(part: CreatePart) {
        const res = await this.api.post<Part>(`${this.baseUrl}/create`, part);
        if(res.status === 401) {
            this.auth.logout()
            throw new Error("Not Authorized")
        }

        if(res.status === 200) {
            return true
        }

        throw new Error('Something went wrong! Please try again later.')
    }

    async deletePart(id: string) {
        const res = await this.api.delete(`${this.baseUrl}/${id}`)

        if(res.status === 401) {
            this.auth.logout()
            throw new Error('Not Authorized')
        }

        if(res.status === 200) {
            return true
        }

        return false
    }

    async updatePart(part: Part) {
        const res = await this.api.patch<Part>(`${this.baseUrl}/${part.id}`, part);

        if(res.status === 401) {
            this.auth.logout()
            throw new Error('Not Authorized')
        }

        if(res.status >=400) {
            throw new Error('Something went wrong! Please try again later.')
        }

        return res.data
    }
}

export const partsService = new PartsSevice(authService, client)