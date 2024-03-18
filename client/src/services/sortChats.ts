import dayjs from "dayjs"
import { ChatTypeResponse } from "../vite-env"

export const sortChats = (chats: ChatTypeResponse[]) => {
    return chats.sort((a, b) => {
        const aLastMessage = dayjs(a.message?.createdAt ?? 0)
        const bLastMessage = dayjs(b.message?.createdAt ?? 0)
        if (aLastMessage > bLastMessage) {
            return -1
        }
        if (aLastMessage < bLastMessage) {
            return 1
        }
        return 0
    })
}