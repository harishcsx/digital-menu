import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoutes';
import serviceRouter from './routes/serviceRoutes';

const app = express();

app.use(cors({
  origin: 'scan-digimenu.vercel.app', // frontend URL
  credentials: true,              // allow cookies
}));
app.use(express.json());
app.use(cookieParser());

app.use('/api', authRoutes);
app.use('/api/service', serviceRouter);

export default app;



