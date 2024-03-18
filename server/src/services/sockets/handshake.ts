import { Socket } from 'socket.io'
import { ChatModel } from '../../models/models/chat'
import { handshakeSchema } from '../../schemas/handshake'
import { UserInfo } from '../../types'

export const handshake = async (socket: Socket) => {
  await handshakeSchema.parseAsync(socket.handshake)
  const response = await fetch(`https://${process.env.APP_DOMAIN}/userinfo`, {
    headers: {
      Authorization: `Bearer ${socket.handshake.auth?.token}`,
    },
  })
  if (!response.ok) {
    console.log('response not ok')
    throw new Error(response.statusText)
  }
  const user = (await response.json()) as UserInfo
  // const user = mockUser[socket.handshake.query.user_id as unknown as number]
  if (!user) {
    console.log('no user')
    throw new Error('no se encontro el user')
  }
  console.log('handshake ok', user.name)

  ChatModel.getChatsByUser(user.sub)
    .then((chats) => {
      for (const chat of chats) {
        socket.join(chat.chat_id)
      }
      console.log(`user: ${user.name} se unio a estos rooms: `, socket.rooms)
    })
    .catch((e) => {
      console.log('error al unir el socket a los chats', e)
      throw new Error('error al unir el socket a los chats')
    })
  return user
}
