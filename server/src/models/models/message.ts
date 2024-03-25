import { Op } from 'sequelize'
import { Chat } from '../sequelize/chat'
import { Chat_user } from '../sequelize/chat_user'
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
  readMessagesByChat: async (chat_id: string, user_id: string) => {
    await Message.update(
      {
        read: true,
      },
      {
        where: {
          chat_id: chat_id,
          read: false,
          user_id: {
            [Op.ne]: user_id,
          },
        },
      },
    )
  },
  getUnreadMessagesByUser: async (user_id: string) => {
    console.log('user_id', user_id)
    const chats = await Chat_user.findAll({
      where: {
        user_id: user_id,
      },
    })
    const allMessages = []
    for (const chat of chats) {
      const messages = await Message.findAll({
        where: {
          chat_id: chat.chat_id,
          read: false,
          user_id: {
            [Op.ne]: user_id,
          }
        },
      })
      console.log(`messages de chat ${chat.chat_id}`, messages)
      allMessages.push(messages)
    }
    return allMessages.flat()
  },
}
