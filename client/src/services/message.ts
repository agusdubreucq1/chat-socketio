import axios from 'axios'
import { MessageTypeResponse } from '../vite-env'

const API_URL = process.env.API_URL

export const createMessage = async (message: string, chatId: string, token: string) => {
  const response = await axios.post(
    `${API_URL}/message/${chatId}`,
    { message },
    { headers: { Authorization: `Bearer ${token}` } },
  )
  return response.data as MessageTypeResponse
}

export const getMessagesByChat = async (chatId: string, token: string) => {
  const response = await axios.get(`${API_URL}/message/${chatId}`, { headers: { Authorization: `Bearer ${token}` } })
  return response.data as MessageTypeResponse[]
}

export const orderMessagesByDate = (messages: MessageTypeResponse[]) => {
  return messages.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
}
