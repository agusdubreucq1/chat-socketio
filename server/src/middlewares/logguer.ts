import { NextFunction, Request, Response } from "express";

export const logguer = (req: Request, _res: Response, next: NextFunction) =>{
    console.log({
        url: req.url,
        method: req.method,
        body: req.body,
        // headers: req.headers
    })
    next()
}