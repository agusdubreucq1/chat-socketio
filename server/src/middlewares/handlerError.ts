import { NextFunction, Request, Response } from 'express'
import { ZodError } from 'zod'

type Newerror = Error | ZodError

export const errorHandler = (error: Newerror, _request: Request, response: Response, next: NextFunction): void => {
  if (error instanceof ZodError) {
    response.status(400).send(error.issues[0].message)
    return
  } else if (error instanceof Error) {
    response.status(400).send(error.message)
    return
  }
  next()
}

export const unknownEndpoint = (_request: Request, response: Response) => {
  return response.status(404).send({ error: 'unknown endpoint' })
}
