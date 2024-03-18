import { Chat } from '../sequelize/chat'
import { db } from '../sequelize/conection'
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
    const transaction = await db.transaction({ autocommit: false })
    const chat = await Chat.findByPk(chat_id)
    if (!chat) {
      throw new Error('Chat not found')
    }
    const messageCreated = await Message.create(
      {
        chat_id,
        user_id,
        message,
      },
      {
        transaction,
      },
    )
    await chat?.update(
      {
        last_message_id: messageCreated.id,
      },
      {
        transaction,
      },
    )
    await transaction.commit()
    return messageCreated
  },
}
