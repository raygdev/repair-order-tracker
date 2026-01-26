import { Request, Response } from "express";
import { Part, PartsDocument } from "../../models/part-model";

export const createPart = async (req: Request<{}, {}, Partial<PartsDocument>>, res: Response) => {
    const { name, price, jobId } = req.body

    const newPart = await Part.create({
        name,
        price,
        jobId
    })

    await newPart.save()

    res.json(newPart)
}