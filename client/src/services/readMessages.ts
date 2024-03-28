import axios from "axios"

const API_URL = process.env.API_URL

export const readMessages = async (token: string, chatId: string) => {
    await axios.put(`${API_URL}/message/read/${chatId}`, {}, { headers: { Authorization: `Bearer ${token}` } })
}