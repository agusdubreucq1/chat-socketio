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
}

export default {
  getMessagesByChatId: catchedAsync(messageController.getMessagesByChatId),
  createMessage: catchedAsync(messageController.createMessage),
}
