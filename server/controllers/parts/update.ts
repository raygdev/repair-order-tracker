import { Request, Response } from "express";
import { Part, PartsDocument } from "../../models/part-model";
import { NotFoundError } from "../../errors/not-found-error";

export const updatePart = async (req: Request<{ id: string }, {}, Partial<PartsDocument>>, res: Response) => {
    const { id } = req.params
    const { name, price, quantity } = req.body

    const part = await Part.findById(id)

    if(!part) {
        throw new NotFoundError()
    }

    if(name) {
        part.set('name', name)
    }

    if(price) {
        part.set('price', price)
    }

    if(quantity) {
        part.set('quantity', quantity)
    }

    await part.save()

    res.json({ message: `successfully updated part with id ${id}`, part})
}