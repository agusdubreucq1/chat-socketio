import { Socket } from 'socket.io'
import { handshakeSchema } from '../schemas/handshake'
import { UserInfo } from '../types'
import { MessageModel } from '../models/models/message'
import { ChatModel } from '../models/models/chat'

// const mockUser = [{
//   sub: 'google-oauth2|103341753629051677112',
//   given_name:'Agustin',
//   family_name:'DUBREUCQ',
//   nickname:'adubreucq395',
//   name:'Agustin DUBREUCQ',
//   picture:'https://lh3.googleusercontent.com/a/ACg8ocIzigzk4NpQnsUsjkinJeH9fQr0bp6d48yVfcd1Ms-x=s96-c',
//   locale:'es',
//   updated_at:'2024-03-13T12:28:50.263Z'
// }, 
// {
//   sub: 'google-oauth2|10334175362905163',
//   given_name:'Agustin',
//   family_name:'duub',
//   nickname:'adubreucq395',
//   name:'Agustin otro',
//   picture:'https://lh3.googleusercontent.com/a/ACg8ocIzigzk4NpQnsUsjkinJeH9fQr0bp6d48yVfcd1Ms-x=s96-c',
//   locale:'es',
//   updated_at:'2024-03-13T12:28:50.263Z'
// }]

let onlineUsers: UserInfo[] = []

const handshake = async (socket: Socket) => {
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

export default async (socket: Socket) => {
  let user: UserInfo
  try {
    user = await handshake(socket)
  } catch (e) {
    console.log('handshake error')
    socket.disconnect()
    return
  }

  socket.use((packet, next) => {
    console.log('packet', packet)
    next()
  })

  if (!onlineUsers.find((u) => u.sub === user.sub)) {
    onlineUsers.push(user)
    console.log(
      'new user online',
      user.name,
      'onlineUsers: ',
      onlineUsers.map((u) => u.name),
    )
    socket.emit('onlineUsers', onlineUsers)
    socket.broadcast.emit('onlineUsers', onlineUsers)
  } else {
    console.log('user already online', user.name)
  }

  const onMessage = async (chatId: string, msg: string) => {

    console.log(`el user: ${user.name} envio el msg: ${msg} al chat: ${chatId}`)
    const newMessage = await MessageModel.createMessage(chatId, user.sub, msg)
    socket.emit('msg', newMessage) //emito a mi mismo
    socket.broadcast.to(chatId).emit('msg', newMessage) //emito a los demas del chat pero no a mi
    // socket.emit('msg-new', newMessage)
    // io.to(chatId).emit('msg-new', newMessage)
  }

  const onDisconnect = () => {
    onlineUsers = onlineUsers.filter((u) => u.sub !== user.sub)
    console.log(
      'user desconnected',
      user.name,
      'onlineUsers: ',
      onlineUsers.map((u) => u.name),
    )
    socket.broadcast.emit('onlineUsers', onlineUsers)
  }

  const onRoom = (id: string) => {
    console.log(`user: ${user.name} se unio al room: ${id}`)
    socket.join(id)
  }


  socket.on('room', onRoom)
  socket.on('msg', onMessage)
  socket.on('disconnect', onDisconnect)
}
