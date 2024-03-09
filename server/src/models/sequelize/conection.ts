import { Sequelize } from 'sequelize'

export const db = new Sequelize('chat-socketio', 'root', '', {
  dialect: 'mysql',
  host: 'localhost',
  logging: false,
})
