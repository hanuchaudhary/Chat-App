import express from 'express';
import { userRouter } from './routes/user.routes';
import connect from './db/db';
import "dotenv/config";
import { projectRouter } from './routes/project.routes';
import cors from 'cors';

connect();
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use("/api/users", userRouter)
app.use("/api/projects", projectRouter)


app.get('/', (req, res) => {
  res.send('Hello World!');
});


app.listen(process.env.PORT || 3000, () => {
  console.log(`Server started on ${process.env.PORT}`);
});