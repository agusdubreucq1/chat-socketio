import { Server, Socket } from 'socket.io'
import { UserInfo} from '../../types'

interface Params {
  user: UserInfo
  socket: Socket
  io: Server
  getOnlineUsers: () => UserInfo[]
  setOnlineUsers: (users: UserInfo[]) => void
}

export const addToOnlineUsers = ({ user, io, socket, getOnlineUsers, setOnlineUsers }: Params) => {
  const onlineUsers = getOnlineUsers()
  console.log(socket.id)
  if (!onlineUsers.find((u) => u.sub === user.sub)) {
    const newUser = user//{ ...user, socket}
    const newOnlineUsers = [...onlineUsers, newUser]
    setOnlineUsers(newOnlineUsers)
    console.log('new user online', user.name)
    io.emit('onlineUsers', newOnlineUsers)
  } else {
    console.log('user already online', user.name)
  }
}
