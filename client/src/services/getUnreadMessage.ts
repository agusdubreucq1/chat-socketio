import axios from "axios"
import { API_URL } from "../const"
import { MessageTypeResponse } from "../vite-env"

export const getUnreadMessages = async (token: string) => {
    const response = await axios.get(`${API_URL}/message/unread`, { headers: { Authorization: `Bearer ${token}` } })
    return response.data as MessageTypeResponse[]
}