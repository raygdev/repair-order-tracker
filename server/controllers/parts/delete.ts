import { Request, Response } from 'express'
import { Part } from '../../models/part-model'
import { NotFoundError } from '../../errors/not-found-error'

export const deletePart = async (req: Request<{id: string}, {}, {}>, res: Response) => {
    const { id } = req.params
    const deletedPart = await Part.findByIdAndDelete(id)

    if(!deletedPart) {
        throw new NotFoundError()
    }

    await deletedPart.save()

    res.json({ message: `successfully delete part with id ${id}`})
}