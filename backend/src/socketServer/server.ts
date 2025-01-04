import { Server, Socket } from 'socket.io';
import express from "express"
import http from "http"

export const app = express();

//socket.io
export const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*"
    }
});


io.on('connection', (socket) => {
    const projectId = socket.handshake.query.projectId as string | undefined;
    console.log("User connected");
    socket.join(projectId!);
    console.log("User joined project: ", projectId);

    socket.on("projectMessage", (messageData) => {
        io.to(projectId!).emit("projectMessage", messageData);
    });

    socket.on("disconnect", () => {
        console.log("User disconnected");
    });
});
