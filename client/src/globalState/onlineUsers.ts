import { User } from '@auth0/auth0-react'
import { create } from 'zustand'

export type OnlineUsers = {
  onlineUsers: User[],
  setOnlineUsers: (users: User[]) => void
}

export const useOnlineUsers = create<OnlineUsers>((set) => ({
  onlineUsers: [],
  setOnlineUsers: (users: User[]) => set({ onlineUsers: users }),
}))
