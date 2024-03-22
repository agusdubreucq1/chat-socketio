import { Request, Response } from 'express'
// import { ChatModel } from '../models/models/chat'
import { MessageModel } from '../models/models/message'
import { catchedAsync } from '../services/catchedAsync'
import { ChatModel } from '../models/models/chat'

const messageController = {
  getMessagesByChatId: async (req: Request, res: Response) => {
    const { id } = req.params
    // const chat = await ChatModel.getChatById(id)
    // if(!chat) {
    //   res.sendStatus(404)
    //   return
    // }
    const messages = await MessageModel.getMessagesByChat(id)
    res.send(messages)
  },
  getUnreadMessages: async (_req: Request, res: Response) => {
    const id = res.locals.user.sub
    const messages = await MessageModel.getUnreadMessagesByUser(id)
    res.send(messages)
  },
  createMessage: async (req: Request, res: Response) => {
    const body = req.body
    const { id } = req.params
    const chat = await ChatModel.getChatById(id)
    if (!chat) {
      res.sendStatus(404)
      return
    }
    const user_id = res.locals.user.sub
    const { message } = body
    const newMessage = await MessageModel.createMessage(id, user_id, message)
    res.send(newMessage)
  },
  readChat: async (req: Request, res: Response) => {
    const user_id = res.locals.user.sub
    console.log('reading chat', req.params)
    const { idChat } = req.params
    await MessageModel.readMessagesByChat(idChat, user_id)
    res.status(200).send('ok')
  },
}

export default {
  getMessagesByChatId: catchedAsync(messageController.getMessagesByChatId),
  getUnreadMessages: catchedAsync(messageController.getUnreadMessages),
  createMessage: catchedAsync(messageController.createMessage),
  readChat: catchedAsync(messageController.readChat),
}
