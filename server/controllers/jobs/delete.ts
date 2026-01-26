import { Request, Response } from "express";
import { Job } from "../../models/job-model";
import { NotFoundError } from "../../errors/not-found-error";


export const deleteJob = async (req: Request, res: Response) => {
    const { id } = req.params

    const job = await Job.findByIdAndDelete(id)

    if(!job) {
        throw new NotFoundError()
    }

    await job.save()

    res.json( { message: `successfully delete job with id ${id}`})
}