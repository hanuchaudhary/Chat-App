import express from 'express';
import { userRouter } from './routes/user.routes';
import connect from './db/db';
import "dotenv/config";
import { projectRouter } from './routes/project.routes';
import cors from 'cors';
import { Server, Socket } from 'socket.io';
import jwt from 'jsonwebtoken';
import http from 'http';
import mongoose from 'mongoose';
import projectModel from './models/project.model';

connect();
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

app.use("/api/users", userRouter)
app.use("/api/projects", projectRouter)


app.get('/', (req, res) => {
    res.send('Welcome to the Chat App');
});


//socket.io
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    },
});

interface CustomSocket extends Socket {
    user?: {
        email: string,
        id: string
    };
    project?: any;
}

//socket.io middleware
io.use(async (socket: CustomSocket, next) => {

    try {
        const token = socket.handshake.auth?.token || socket.handshake.headers.authorization?.split(' ')[1];
        if (!token) {
            return next(new Error('Authentication error'))
        }

        const projectId = socket.handshake.query.projectId;
        if (!mongoose.Types.ObjectId.isValid(projectId as string)) {
            return next(new Error('Invalid projectId'));
        }
        socket.project = await projectModel.findById(projectId);

        if (!process.env.JWT_SECRET) {
            return next(new Error('JWT_SECRET is not defined'));
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET) as { email: string, id: string };
        if (!decoded) {
            return next(new Error('Authentication error'))
        }

        socket.user = decoded;
        next();

    } catch (error: any) {
        next(error)
    }

})

io.on('connection', (socket: CustomSocket) => {
    socket.join(socket.project._id.toString());

    socket.on("projectMessage", (data) => {
        io.to(socket.project._id).emit("projectMessage", data);
        console.log(data);
    });

    console.log(`${socket.id} user connected`);
    socket.on("disconnect", () => {
        console.log(`${socket.id} disconnected`);
    });
});

server.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});