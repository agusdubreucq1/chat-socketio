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
import { Server } from 'socket.io'
import initSocketsHandler from './services/socketsHandler'
import { instrument } from '@socket.io/admin-ui'

const app = express()
app.use(express.static('./node_modules/@socket.io/admin-ui/ui/dist'))
const server = http.createServer(app)
export const io = new Server(server, {
  cors: {
    origin: [
      'https://admin.socket.io',
      process.env.FRONTEND_URL || 'http://localhost:5173',
      'https://admin.socket.io',
      'https://admin.socket.io/#/',
    ],
    credentials: true,
  },
})

instrument(io, {
  auth: false,
  mode: 'development',
})

io.use((socket, next) => {
  console.log('new connection', socket.id)
  next()
})
io.on('connection', initSocketsHandler)
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

// app.get('/authorized', jwtCheck, async (req, res) => {
//   // console.log(req.auth)

//   try {
//     const response = await fetch(`https://${process.env.APP_DOMAIN}/userinfo`, {
//       headers: {
//         Authorization: `Bearer ${req.auth?.token}`,
//       },
//     })

//     if (!response.ok) {
//       throw new Error(response.statusText)
//     }
//     const data = await response.json()
//     res.send(data)
//   } catch (error) {
//     console.log(error)
//     res.sendStatus(500)
//   }
// })

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
