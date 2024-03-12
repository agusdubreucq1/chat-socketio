import { client } from '../..'
import { AllMembersAreUsers, ChatEqual } from '../../services/users'
import { Chat } from '../sequelize/chat'
import { Chat_user } from '../sequelize/chat_user'
import { db } from '../sequelize/conection'

export const ChatModel = {
  createChat: async (name: string, members: string[]) => {
    if (!(await AllMembersAreUsers(members))) {
      throw new Error('All members must be users')
    }
    const chatEqual = await ChatEqual(members)
    if (chatEqual) {
      return chatEqual
      // throw new Error('Chat already exist') //TODO return chat
    }
    //TODO verify not create before
    const transaccion = await db.transaction({ autocommit: false })
    const chat = await Chat.create(
      {
        name,
      },
      { transaction: transaccion },
    )
    for (const member of members) {
      await Chat_user.create(
        {
          chat_id: chat.id,
          user_id: member,
        },
        {
          transaction: transaccion,
        },
      )
    }
    await transaccion.commit()
    return chat
  },
  getChatsByUser: async (userId: string) => {
    const chats_user = await Chat_user.findAll({
      attributes: ['chat_id'],
      where: {
        user_id: userId,
      },
    })
    const chats = chats_user.map((chat_user) => Chat.findByPk(chat_user.chat_id))

    let response = []
    for (const chat of await Promise.all(chats)) {
      response.push(await ChatModel.getChatById(chat?.id as string))
    } //todos los chats con sus members
    return response
  },
  getChatById: async (id: string) => {
    const chat = await Chat.findByPk(id)
    const chats_user = await Chat_user.findAll({
      attributes: ['user_id'],
      where: {
        chat_id: id,
      },
    })
    const users = chats_user.map((chat_user) => client.users.get({ id: chat_user.user_id }).then((user) => user.data))
    const response = {
      ...chat?.dataValues,
      members: await Promise.all(users),
    }
    return response
  },
}
