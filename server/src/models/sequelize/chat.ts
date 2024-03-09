import { DataTypes } from 'sequelize'
import { db } from './conection'
import { ChatModel } from '../../types'

export const Chat = db.define<ChatModel>('chats', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
  },
})
