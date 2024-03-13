import { Request, Response } from 'express'
import { ChatModel } from '../models/models/chat'
import { catchedAsync } from '../services/catchedAsync'
import { chatCreatedSchema, groupCreatedSchema } from '../schemas/chats'

const chatsController = {
  getChats: async (_req: Request, res: Response) => {
    const user = res.locals.user
    if (!user) {
      res.sendStatus(404)
      return
    }
    const chats = await ChatModel.getChatsByUser(user.sub)
    res.send(chats)
  },

  getChatByID: async (req: Request, res: Response) => {
    const { id } = req.params
    const chat = await ChatModel.getChatById(id)
    res.send(chat)
  },

  createChat: async (req: Request, res: Response) => {
    const body = await chatCreatedSchema.parseAsync(req.body)
    const { members } = body
    const user = res.locals.user
    members.push(user.sub)
    const chat = await ChatModel.createChat('chat', members)
    res.send(chat)
  },

  createGroupChat: async (req: Request, res: Response) => {
    const body = await groupCreatedSchema.parseAsync(req.body)
    const { members, name } = body
    const user = res.locals.user
    members.push(user.sub)
    const chat = await ChatModel.createChat(name, members)
    res.send(chat)
  },
}

export default {
  getChats: catchedAsync(chatsController.getChats),
  getChatByID: catchedAsync(chatsController.getChatByID),
  createChat: catchedAsync(chatsController.createChat),
  createGroupChat: catchedAsync(chatsController.createGroupChat),
}
