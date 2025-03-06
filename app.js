import express from 'express';
import { config } from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { connection } from './database/dbConnection.js';
import { errorMiddleware } from './middlewares/error.js';
import userRouter from './routes/userRouter.js';
import { removeUnverifiedAccounts } from './automation/removeUnverifiedAccounts.js';

export const app = express();
config({ path: './config.env' });

app.use(
  cors({
    origin: 'https://auth-app-v2.onrender.com', // This allows requests from any origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/user', userRouter);

removeUnverifiedAccounts();
connection();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.resolve(__dirname, 'dist')));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
});

app.use(errorMiddleware);
