import { create } from "zustand";
import { MessageTypeResponse } from "../vite-env";
import { getUnreadMessages } from "../services/getUnreadMessage";
import useToken from "../components/hooks/useToken";

export interface UnreadMessages {
    unreadMessages: MessageTypeResponse[];
    InitUnreadMessages: () => void;
    setUnreadMessages: (unreadMessages: MessageTypeResponse[]) => void;
    addUnreadMessage: (unreadMessage: MessageTypeResponse) => void;
    readAllByChat: (chatId: string) => void;
}

export const useUnreadMessages = create<UnreadMessages>((set, get) => ({
    unreadMessages: [],
    InitUnreadMessages: async () => {
        const {token} = useToken()
        const unreadMessage = await getUnreadMessages(token)
        set({ unreadMessages: unreadMessage })
    },
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