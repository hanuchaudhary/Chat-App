import socket, { Socket } from "socket.io-client";

let socketInstance: Socket | null = null;

export const initilizeSocket = (projectId: string) => {
    socketInstance = socket("http://localhost:3000", {
        auth: {
            token: localStorage.getItem("token")
        },
        query: {
            projectId
        }
    });
}

export const recieveMessage = (eventName: string, cb: (data: any) => void) => {
    if (socketInstance) {
        socketInstance.on(eventName, cb);
    }
}

export const sendMessage = (eventName: string, data: any) => {
    if (socketInstance) {
        socketInstance.emit(eventName, data)
    }
}

