import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoutes.js';
import serviceRouter from './routes/serviceRoutes.js';

const app = express();

app.use(cors({
  origin: 'https://scan-digimenu.vercel.app', // frontend URL
  credentials: true,              // allow cookies
}));
app.use(express.json());
app.use(cookieParser());

app.use('/api', authRoutes);
app.use('/api/service', serviceRouter);

export default app;


