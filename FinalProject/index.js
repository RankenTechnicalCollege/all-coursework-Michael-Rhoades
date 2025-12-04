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
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors(
  {
    origin: ['http://localhost:3012', "http://localhost:8080", 'http://localhost:5173', 'http://localhost:3000', 'https://issuetracker-base-348399308686.us-central1.run.app'],
    credentials: true
  }
));
app.use(express.static('frontend/dist'));

app.all("/api/auth/*splat", toNodeHandler(auth));
app.use('/api/users', userRouter);
app.use('/api/bugs', bugRouter);
const port = process.env.PORT || 3000;

// Handle React routing - send all non-API requests to React
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/dist/index.html'));
});


app.listen(port,() => {
  debugServer(`Server is now running on port http://localhost:${port}`);
})
