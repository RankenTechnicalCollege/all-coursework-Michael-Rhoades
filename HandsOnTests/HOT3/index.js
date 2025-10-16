import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import debug from 'debug';
const debugServer = debug('app:Server');
import cors from 'cors';

import { productRouter } from './routes/api/products.js';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(express.static('HOT3/dist'));
app.use('/api/products', productRouter);
const port = process.env.PORT || 3000;

app.listen(port,() => {
  debugServer(`Server is now running on port http://localhost:${port}`);
})
