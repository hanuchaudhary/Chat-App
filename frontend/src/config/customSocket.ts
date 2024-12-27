import { io, Socket } from 'socket.io-client';

interface ServerToClientEvents {
  message: (data: string) => void;
  error: (error: string) => void;
}

interface MessageData {
  message: string;
  senderId: string;
}

let socketInstance: Socket<ServerToClientEvents> | null = null;

export const initializeSocket = (projectId: string) => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('Authentication token is missing');
  }  

  socketInstance = io(import.meta.env.VITE_API_URL, {
    auth: { token },
    query: { projectId },
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
  });

  socketInstance.on('connect', () => {
    console.log('Socket connected:', socketInstance?.id);
  });

  socketInstance.on('disconnect', (reason) => {
    console.warn('Socket disconnected:', reason);
  });

  socketInstance.on('connect_error', (err) => {
    console.error('Connection error:', err);
  });

  return socketInstance;
};

export const receiveMessage = (eventName: keyof ServerToClientEvents, cb: (data: any) => void) => {
  if (!socketInstance) {
    console.error('Socket not initialized. Call initializeSocket first.');
    return;
  }
  socketInstance.on(eventName, cb);
};

export const sendMessage = (eventName: 'sendMessage', data: MessageData) => {
  if (!socketInstance) {
    console.error('Socket not initialized. Call initializeSocket first.');
    return;
  }
  socketInstance.emit(eventName, data);
};
