import axios from "axios"
import { MessageTypeResponse } from "../vite-env"
const API_URL = process.env.API_URL

export const getUnreadMessages = async (token: string) => {
    const response = await axios.get(`${API_URL}/message/unread`, { headers: { Authorization: `Bearer ${token}` } })
    return response.data as MessageTypeResponse[]
}