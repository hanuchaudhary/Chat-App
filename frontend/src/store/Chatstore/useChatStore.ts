import { create } from "zustand";
import { Socket, io } from 'socket.io-client';
import { useProjectsStore } from "../ProjectsStore/useProjectsStore";

const SOCKET_URI = 'http://localhost:3000';

export interface MessageData {
    message: string;
    senderId: string;
    projectId: string;
    email: string;
}

interface ChatStore {
    socket: Socket | null;
    connectSocket: () => void;
    disconnectSocket: () => void;
    messages: MessageData[];
    sendMessage: (messageData: MessageData) => void;
}

export const useChatStore = create<ChatStore>((set, get) => ({
    socket: null,
    connectSocket: () => {
        const projectId = useProjectsStore.getState().selectedProjectId;
        if (!projectId) {
            console.error("No project selected");
            return;
        }
        const socket = io(SOCKET_URI, {
            query: { projectId },
            reconnectionDelay: 1000,
        });

        socket.connect();
        set({ socket });
        socket.on("projectMessage", (messageData: MessageData) => {
            const projectId = useProjectsStore.getState().selectedProjectId;
            if (messageData.projectId === projectId) {
            set((state) => ({ messages: [...state.messages, messageData] }));
            }
        });

    },
    disconnectSocket: () => {
        const socket = get().socket;
        if (socket) {
            socket.disconnect();
            console.log("Socket Disconnected...");
            set({ socket: null });
        }
    },
    messages: [],
    sendMessage: (messageData: MessageData) => {
        const socket = get().socket;
        if (socket) {
            socket.emit("projectMessage", messageData);
        }
    },
}));