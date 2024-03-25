import { Server, Socket } from 'socket.io'
import { UserInfo, UserOnline} from '../../types'

interface Params {
  user: UserInfo
  socket: Socket
  io: Server
  getOnlineUsers: () => UserOnline[]
  setOnlineUsers: (users: UserOnline[]) => void
}

export const addToOnlineUsers = ({ user, io, socket, getOnlineUsers, setOnlineUsers }: Params) => {
  const onlineUsers = getOnlineUsers()
  // console.log(socket.id)
  if (!onlineUsers.find((u) => u.sub === user.sub)) {
    const newUser = { ...user, socketId: socket.id }
    const newOnlineUsers = [...onlineUsers, newUser]
    setOnlineUsers(newOnlineUsers)
    // console.log('new user online', user.name)
    io.emit('onlineUsers', newOnlineUsers)
  } else {
    // console.log('user already online', user.name)
  }
}
