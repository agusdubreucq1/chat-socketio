import { config } from 'dotenv'
config()
import express from 'express'
import { auth } from 'express-oauth2-jwt-bearer'
import cors from 'cors'
import { ManagementClient } from 'auth0'
// import { Server } from 'socket.io'
import http from 'http'
import routerUser from './routes/users'
import { logguer } from './middlewares/logguer'
import { addUser } from './middlewares/addUser'
import routerChat from './routes/chats'
import { initDb } from './models/sequelize/config'
import { errorHandler, unknownEndpoint } from './middlewares/handlerError'

const app = express()
const server = http.createServer(app)
// const io = new Server(server, {
//   cors: {
//     origin: process.env.FRONTEND_URL || 'http://localhost:5173',
//   }
// })

// io.on('connection' , (socket) => {
//   console.log('a user connected')

//   socket.on('msg', (data) =>{
//     console.log(data)
//   })
// })

const port = process.env.PORT || 8080

app.use(cors())
app.use(express.json())
app.use(logguer)

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

app.use(jwtCheck)
app.use(addUser)

app.get('/authorized', jwtCheck, async (req, res) => {
  console.log(req.auth)

  try {
    const response = await fetch(`https://${process.env.APP_DOMAIN}/userinfo`, {
      headers: {
        Authorization: `Bearer ${req.auth?.token}`,
      },
    })

    if (!response.ok) {
      throw new Error(response.statusText)
    }
    const data = await response.json()
    res.send(data)
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
})

app.use('/user', routerUser)
app.use('/chat', jwtCheck, routerChat)

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
