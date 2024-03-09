import { DataTypes } from 'sequelize'
import { db } from './conection'
import { Chat_userModel } from '../../types'

export const Chat_user = db.define<Chat_userModel>('chat_user', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.UUID,
  },
  chat_id: {
    type: DataTypes.UUID,
  },
})
