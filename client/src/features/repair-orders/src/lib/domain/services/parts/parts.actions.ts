import { partsService, type CreatePart } from "./parts.service";
import type { Part } from "../../models/job.model";


class PartActions {

    constructor(private partsSevice: typeof partsService){}

   async create(part: CreatePart) {
    const success = await this.partsSevice.createPart(part)
    return success
   }

   async post(part: Part) {
    const updated = await this.partsSevice.updatePart(part)
    return updated
   }

   async delete(id: string) {
    const success = await this.partsSevice.deletePart(id)
    return success
   }
}

export const partActions = new PartActions(partsService)