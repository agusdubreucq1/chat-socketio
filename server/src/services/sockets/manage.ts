import { Server, Socket } from 'socket.io'
import { UserInfo, UserOnline } from '../../types'
import { MessageModel } from '../../models/models/message'

export const manageSocket = (
  io: Server,
  socket: Socket,
  user: UserInfo,
  setOnlineUsers: (users: UserOnline[]) => void,
  getOnlineUsers: () => UserOnline[]
) => {
  const onMessage = async (chatId: string, msg: string) => {
    console.log(`el user: ${user.name} envio el msg: ${msg} al chat: ${chatId}`)
    const newMessage = await MessageModel.createMessage(chatId, user.sub, msg)
    io.to(chatId).emit('msg', newMessage)
  }

  const onDisconnect = () => {
    const newOnlineUsers = getOnlineUsers().filter((u) => u.sub !== user.sub)
    setOnlineUsers(newOnlineUsers)
    console.log('user desconnected', user.name)
    socket.broadcast.emit('onlineUsers', newOnlineUsers)
  }

  const onRoom = (idChat: string, idMember: string) => {
    console.log(`user: ${user.name} se unio al room: ${idChat}`)
    socket.join(idChat)
    const userMember = getOnlineUsers().find((u) => u.sub === idMember)
    if (userMember) {
      io.to(userMember.socketId).emit('newChat', idChat)
    }

  }

  const onJoin = (id: string) => {
    console.log(`user: ${user.name} se unio al room: ${id}`)
    socket.join(id)
  }

  socket.on('msg', onMessage)
  socket.on('disconnect', onDisconnect)
  socket.on('room', onRoom)
  socket.on('join', onJoin)
}
