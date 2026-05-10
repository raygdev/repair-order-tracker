import { Request, Response } from "express";
import { Job } from "../../models/job-model";
import { Part } from "../../models/part-model";
import { NotFoundError } from "../../errors/not-found-error";
import { NotAuthorizedError } from "../../errors/not-authorized-error";


export const deleteJob = async (req: Request, res: Response) => {
    const { id } = req.params
    const userId = req.user!.id

    const job = await Job.findById(id)

    if(!job) {
        throw new NotFoundError()
    }

    if(job.userId.toString() !== userId) {
        throw new NotAuthorizedError()
    }

    await Part.deleteMany({ jobId: id })

    await job.deleteOne()

    await job.save()

    res.json( { message: `successfully delete job with id ${id}`})
}