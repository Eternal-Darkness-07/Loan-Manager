// src/app.ts
import express from 'express';
import cors from 'cors';
import authRouter from './routes/auth.routes';
import loanRoutes from './routes/loan.routes';
import adminRoutes from './routes/admin.routes';
import verifierRoutes from './routes/verifier.routes';
import userRoutes from './routes/user.routes';


const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRouter);
app.use('/api/loan-applications', loanRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/verifier', verifierRoutes);
app.use('/api/user', userRoutes);

export default app;
