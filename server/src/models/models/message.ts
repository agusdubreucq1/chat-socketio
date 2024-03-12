
import { Message } from '../sequelize/message'

export const MessageModel = {
  getMessagesByChat: async (chat_id: string) => {
    const messages = await Message.findAll({
      where: {
        chat_id: chat_id,
      },
    })
    return messages
  },
  createMessage: async (chat_id: string, user_id: string, message: string) => {
    const messageCreated = await Message.create({
      chat_id,
      user_id,
      message,
    })
    return messageCreated
  },
}
