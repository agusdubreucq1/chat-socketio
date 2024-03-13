import { Socket } from 'socket.io'
import { handshakeSchema } from '../schemas/handshake'
import { UserInfo } from '../types'
import { MessageModel } from '../models/models/message'
import { ChatModel } from '../models/models/chat'

let onlineUsers: UserInfo[] = []

const handshake = async (socket: Socket) => {
  await handshakeSchema.parseAsync(socket.handshake)
  const response = await fetch(`https://${process.env.APP_DOMAIN}/userinfo`, {
    headers: {
      Authorization: `Bearer ${socket.handshake.auth?.token}`,
    },
  })
  if (!response.ok) {
    throw new Error(response.statusText)
  }
  const user = (await response.json()) as UserInfo
  if (!user) {
    throw new Error('no se encontro el user')
  }
  console.log('handshake ok', user.name)

  ChatModel.getChatsByUser(user.sub)
    .then((chats) => {
      for (const chat of chats) {
        socket.join(chat.id)
      }
    })
    .catch((e) => console.log('error al unir el socket a los chats', e))
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
  } else {
    console.log('user already online', user.name)
  }

  const onMessage = async (chatId: string, msg: string) => {
    console.log(`el user: ${user.name} envio el msg: ${msg} al chat: ${chatId}`)
    const newMessage = await MessageModel.createMessage(chatId, user.sub, msg)
    socket.to(chatId).to(socket.id).emit('msg', newMessage)
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
