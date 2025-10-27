import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import debug from 'debug';
const debugServer = debug('app:Server');
import cors from 'cors';
import { auth } from './auth.js';
import { toNodeHandler } from 'better-auth/node';

import { userRouter } from './routes/api/user.js';
import { bugRouter } from './routes/api/bug.js';


const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors(
  {
    origin: ['http://localhost:3012', "http://localhost:8080", 'http://localhost:5173', 'http://localhost:3000', 'https://issuetracker-base-348399308686.us-central1.run.app'],
    credentials: true
  }
));
app.use(express.static('IssueTracker/dist'));

app.all("/api/auth/*splat", toNodeHandler(auth));
app.use('/api/users', userRouter);
app.use('/api/bugs', bugRouter);
const port = process.env.PORT || 3000;

app.listen(port,() => {
  debugServer(`Server is now running on port http://localhost:${port}`);
})
