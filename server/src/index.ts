import { config } from 'dotenv'
config()
import express from 'express'
import { auth } from 'express-oauth2-jwt-bearer'
import cors from 'cors'
import { ManagementClient } from 'auth0'
// import { Server } from 'socket.io'
import http from 'http'
import routerUser from './routes/users'
// import { logguer } from './middlewares/logguer'
import { addUser } from './middlewares/addUser'
import routerChat from './routes/chats'
import { initDb } from './models/sequelize/config'
import { errorHandler, unknownEndpoint } from './middlewares/handlerError'
import routerMsg from './routes/messages'
import { Server, Socket } from 'socket.io'
// import initSocketsHandler from './services/socketsHandler'
import { instrument } from '@socket.io/admin-ui'
import { UserInfo, UserOnline  } from './types'
import { handshake } from './services/sockets/handshake'
import { manageSocket } from './services/sockets/manage'
import { addToOnlineUsers } from './services/sockets/onDisconnect'

const app = express()
app.use(express.static('./node_modules/@socket.io/admin-ui/ui/dist'))
const server = http.createServer(app)
export const io = new Server(server, {
  cors: {
    origin: ['https://admin.socket.io', process.env.FRONTEND_URL || 'http://localhost:5173'],
    credentials: true,
  },
})

instrument(io, {
  auth: false,
  mode: 'development',
})

let onlineUsers: UserOnline[] = []

const setOnlineUsers = (users: UserOnline[]) => {
  onlineUsers = users
}

const getOnlineUsers = () => onlineUsers

const onConnection = async (socket: Socket) => {
  let user: UserInfo
  try {
    user = await handshake(socket)
  } catch (e) {
    console.log('handshake error')
    socket.disconnect()
    return
  }

  addToOnlineUsers({ user, socket,  io, getOnlineUsers, setOnlineUsers })
  manageSocket(io, socket, user, setOnlineUsers, getOnlineUsers)
}

io.on('connection', onConnection)
const port = process.env.PORT || 8080

app.use(cors())
app.use(express.json())
// app.use(logguer)

export const client = new ManagementClient({
  domain: process.env.MACHINE_TO_MACHINE_DOMAIN || '',
  clientId: process.env.MACHINE_TO_MACHINE_CLIENT_ID || '',
  clientSecret: process.env.MACHINE_TO_MACHINE_CLIENT_SECRET || '',
})

const jwtCheck = auth({
  audience: 'miaudiencepablo',
  issuerBaseURL: 'https://domainpablo.us.auth0.com/',
  tokenSigningAlg: 'RS256',
})

app.use('/user', routerUser)
app.use('/message', jwtCheck, addUser, routerMsg)
app.use('/chat', jwtCheck, addUser, routerChat)

app.use(errorHandler)
app.use(unknownEndpoint)

// app.listen(port, () => {
//   console.log(`Server running on port ${port}`)
// })
server.listen(port, async () => {
  try {
    await initDb()
  } catch (error) {
    console.log(error)
  }
  console.log(`Server running on port ${port}`)
})

console.log('Running on port ', port)
