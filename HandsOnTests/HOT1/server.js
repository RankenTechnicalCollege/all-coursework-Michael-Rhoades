import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import debug from 'debug';
const debugServer = debug('app:Server');
import { mpgRouter } from './routes/api/mpg.js';
import { tempRouter } from './routes/api/temperature.js';
import { taxRouter } from './routes/api/income-tax.js';
import { interestRouter } from './routes/api/interest.js';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));
app.use('/api/mpg', mpgRouter);
app.use('/api/temperature', tempRouter);
app.use('/api/income-tax', taxRouter);
app.use('/api/interest', interestRouter);
const port = process.env.PORT || 5010; //env contains 5010

app.listen(port,() => {
  debugServer(`Server is now running on port http://localhost:${port}`);
})