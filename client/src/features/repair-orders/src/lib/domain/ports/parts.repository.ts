import type { Part } from "../models/job.model";
import { BaseUrls } from "../types/base-url";

export interface CreatePart extends Omit<Part, 'id'> {}

export abstract class PartsRepositoryPort {
    protected baseUrl = BaseUrls.PartsBaseUrl
    abstract createPart(part: CreatePart) : Promise<boolean>
    abstract deletePart(id: string): Promise<boolean>
    abstract updatePart(part: Part): Promise<Part>
}
