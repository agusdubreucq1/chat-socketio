import { NextFunction, Request, Response } from 'express'

export const catchedAsync = (fn: (req: Request, res: Response) => Promise<void>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    fn(req, res).catch((e) => next(e))
  }
}
