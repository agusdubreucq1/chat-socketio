import { Request, Response } from 'express'
import { client } from '..'
import { catchedAsync } from '../services/catchedAsync'

const userController = {
  getUsers: async (_req: Request, res: Response) => {
    const users = await client.users.getAll()
    res.send(users)
  },

  getUserById: async (req: Request, res: Response) => {
    const { id } = req.params
    const user = await client.users.get({
      id: id,
    })
    console.log(user)
    res.send(user)
  },
}

export default {
  getUsers: catchedAsync(userController.getUsers),
  getUserById: catchedAsync(userController.getUserById),
}
