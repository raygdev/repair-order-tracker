import { client } from "@features/utils/url";

import type { Part } from "../../models/job.model";
import { authService } from "@services/auth";

export interface CreatePart extends Omit<Part, 'id'> {}

export class PartsSevice  {

    constructor(
        private auth: typeof authService,
        private api: typeof client
    ) {}

    async createPart(part: CreatePart): Promise<boolean> {
        const res = await this.api.post<Part>('/api/jobs/create', part);
        if(res.status === 401) {
            this.auth.logout()
            throw new Error("Not Authorized")
        }

        if(res.status === 200) {
            return true
        }

        throw new Error('Something went wrong! Please try again later.')
    }

    async deletePart(id: string): Promise<boolean> {
        const res = await this.api.delete(`/api/parts/${id}`)

        if(res.status === 401) {
            this.auth.logout()
            throw new Error('Not Authorized')
        }

        if(res.status === 200) {
            return true
        }

        return false
    }

    async updatePart(part: Part): Promise<Part> {
        const res = await this.api.patch<Part>(`/api/parts/:${part.id}`, part);

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