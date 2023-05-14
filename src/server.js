import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';

import { connectMongoDB } from './utils/mongo.js';

const app = express();
const port = process.env.PORT || 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors({ origin: `http://localhost:${port}` }));
app.use(helmet());
app.use(cookieParser());
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

await connectMongoDB();

app.use('/api/*', (req, res) => {
  res.status(404).json({
    status: 'fail',
    message: 'API not found!'
  });
});

const server = app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
