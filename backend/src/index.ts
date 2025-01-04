import express from "express";
import { userRouter } from './routes/user.routes';
import connect from './db/db';
import "dotenv/config";
import { projectRouter } from './routes/project.routes';
import cors from 'cors';
import { app, server } from './socketServer/server';


//db connect
connect();
app.use(cors());
app.use(express.json());

app.use("/api/users", userRouter)
app.use("/api/projects", projectRouter)


app.get('/', (req, res) => {
    res.send('Welcome to the Chat App');
});

server.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});