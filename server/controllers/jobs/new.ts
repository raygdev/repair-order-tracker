import { Request, Response } from "express";
import { Job, JobDocument } from "../../models/job-model";

export const createJob = async (req: Request<{}, {}, Partial<JobDocument>>, res: Response) => {
    const { description, labor, repairId } = req.body

    const newJob = await Job.create({
        description,
        labor,
        repairId,
        userId: req.user!.id
    })

    await newJob.save()

    res.json(newJob)
}