import { Socket } from 'socket.io-client'
import { create } from 'zustand'

interface useSocket {
  socket: Socket | null
  setSocket: (socket: Socket) => void
}

export const useSocket = create<useSocket>((set) => ({
  socket: null,
  setSocket: (socket: Socket) => set({ socket }),
}))
