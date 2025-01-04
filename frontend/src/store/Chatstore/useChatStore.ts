import { create } from "zustand";
import { Socket, io } from 'socket.io-client'

const SocketURI = 'http://localhost:3000'

interface chatStore {
    socket: null | Socket
    connectSocket: () => void;
    disconnectSocket: () => void
}

export const useChatStore = create<chatStore>((set, get) => ({
    socket: null,
    connectSocket: () => {
        const socket = io(SocketURI);
        socket.connect();
        console.log("Socket Connected...");
        set({ socket })
    },
    disconnectSocket: () => {
        const socket = get().socket;
        socket?.disconnect();
        console.log("Socket Disconnected...");
        set({ socket: null });
    }
}))