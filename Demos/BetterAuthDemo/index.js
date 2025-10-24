import express from 'express';
import { toNodeHandler } from "better-auth/node";
import auth from './auth.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.all("/api/auth/*splat", toNodeHandler(auth));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

