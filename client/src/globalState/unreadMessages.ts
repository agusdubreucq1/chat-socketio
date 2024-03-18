import { create } from "zustand";
import { MessageTypeResponse } from "../vite-env";

export interface UnreadMessages {
    unreadMessages: MessageTypeResponse[];
    setUnreadMessages: (unreadMessages: MessageTypeResponse[]) => void;
    addUnreadMessage: (unreadMessage: MessageTypeResponse) => void;
    readAllByChat: (chatId: string) => void;
}

export const useUnreadMessages = create<UnreadMessages>((set, get) => ({
    unreadMessages: (()=>{
        const unreadMessages = localStorage.getItem('unreadMessages')
        if (unreadMessages) {
            return JSON.parse(unreadMessages)
        } else {
            return []
        }
    })(),
    setUnreadMessages: (unreadMessages: MessageTypeResponse[]) => {
        localStorage.setItem('unreadMessages', JSON.stringify(unreadMessages))
        set({ unreadMessages })
    },
    addUnreadMessage: (unreadMessage: MessageTypeResponse) => {
        const newUnreadMessages = [...get().unreadMessages, unreadMessage]
        localStorage.setItem('unreadMessages', JSON.stringify(newUnreadMessages))
        set(() => ({ unreadMessages: newUnreadMessages }))
    },
    readAllByChat: (chatId: string) => {
        const newUnreadMessages = get().unreadMessages.filter((unreadMessage) => unreadMessage.chat_id !== chatId)
        localStorage.setItem('unreadMessages', JSON.stringify(newUnreadMessages))
        set(() => ({ unreadMessages: newUnreadMessages }))
    }
}))