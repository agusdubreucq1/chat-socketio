import axios from "axios"
import { API_URL } from "../const"

export const readMessages = async (token: string, chatId: string) => {
    await axios.put(`${API_URL}/message/read/${chatId}`, {}, { headers: { Authorization: `Bearer ${token}` } })
}