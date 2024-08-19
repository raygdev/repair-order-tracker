import express, { Request, Response, NextFunction} from 'express'
import { CustomError } from '../../errors/custom-error'

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if(err instanceof CustomError) {
    return res.status(err.statusCode).send({ errors: err.serializeError()})
  }
  res.status(400).send({
    errors: [{ message: "Something went wrong" }]
  })
}