import { Request, Response } from "express"

export const verifyController = (req:Request, res: Response) => {
    res.status(200).json({ message: "User is Authenticated"})
}

