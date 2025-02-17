import { Request, Response } from "express";
import { Job, JobDocument } from "../../models/job-model";
import { NotFoundError } from "../../errors/not-found-error";
import { NotAuthorizedError } from "../../errors/not-authorized-error";

export const updateJob = async (req: Request<{id: string}, {}, Partial<JobDocument>>, res: Response) => {
    const { id } = req.params
    const { description, labor } = req.body

    const job = await Job.findById(id)

    if(!job) {
        throw new NotFoundError()
    }

    if(req.user!.id !== job.userId.toString()) {
        throw new NotAuthorizedError()
    }

    if(description) {
        job.set('description', description)
    }

    if(labor) {
        job.set('labor', labor)
    }

    await job.save()


    res.json({ message: `Job with id ${id} successfully updated`, job})
}