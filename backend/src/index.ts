import express from 'express';
import { userRouter } from './routes/user.routes';
import connect from './db/db';
import "dotenv/config";

connect();
const app = express();
app.use(express.json());
app.use("/api/users",userRouter)

app.get('/', (req, res) => {
  res.send('Hello World!');
});


app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});