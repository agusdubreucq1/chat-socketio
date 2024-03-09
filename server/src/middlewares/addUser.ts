import { NextFunction, Request, Response } from 'express'

export const addUser = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.auth) {
    next()
    return
  }
  try {
    const response = await fetch(`https://${process.env.APP_DOMAIN}/userinfo`, {
      headers: {
        Authorization: `Bearer ${req.auth?.token}`,
      },
    })

    if (!response.ok) {
      return next()
    }
    const data = await response.json()
    res.locals.user = data
  } catch (error) {
    console.log('catch')
    console.log(error)
  }
  next()
}
