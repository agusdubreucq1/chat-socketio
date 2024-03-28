import axios from 'axios'
import { fetchUrl } from './fetch'
import { ChatTypeResponse } from '../vite-env'

const API_URL = process.env.API_URL

export const createChatAPI = async (body, token) => {
  try {
    const response = await fetchUrl(`${API_URL}/chat`, body, token)
    const data = await response.json()
    return data
  } catch (error) {
    console.log(error)
  }
}

export const createChat = async (member: string, token: string) => {
  const response = await axios.post(`${API_URL}/chat`, { members: [member] }, { headers: { Authorization: `Bearer ${token}` } })
  return response.data as ChatTypeResponse
}

export const getChats = async (token: string) =>{
  const response = await axios.get(`${API_URL}/chat`, { headers: { Authorization: `Bearer ${token}` } })
  return response.data as ChatTypeResponse[]
}
