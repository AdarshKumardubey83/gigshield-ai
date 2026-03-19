import express from 'express';
import cors from 'cors';
import { errorHandler } from './middlewares/error.middleware.js';
import authRoutes from './routes/auth.routes.js';

const app = express();

// Body parser
app.use(express.json());

// Enable CORS
app.use(cors());

// Mount routers
app.use('/api/auth', authRoutes);
// For requirements specifically asking for /api/user/profile
app.use('/api/user', authRoutes); // authRoutes contains the /profile endpoint

// Error handler middleware (must be after routes)
app.use(errorHandler);

export default app;
