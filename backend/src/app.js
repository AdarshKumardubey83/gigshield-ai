import express from 'express';
import cors from 'cors';
import { errorHandler } from './middlewares/error.middleware.js';
import authRoutes from './routes/auth.routes.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Body parser
app.use(express.json());

// Enable CORS
app.use(cors());

// Mount routers
app.use('/api/auth', authRoutes);
// For requirements specifically asking for /api/user/profile
app.use('/api/user', authRoutes); // authRoutes contains the /profile endpoint

// --- UPTIME ROBOT HEALTH CHECKS ---
// 1. Health check route returning JSON
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Server is healthy and running' });
});

// 2. Simple root route returning text (Useful for Uptime Robot pinging the main URL)
app.get('/api', (req, res) => {
  res.status(200).send('API is running securely.');
});

// --- FRONTEND INTEGRATION ---
// 1. Serve static files from the public folder
app.use(express.static(path.join(__dirname, '../public')));

// 2. Catch-all route to hand off routing to React Router
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

// Error handler middleware (must be after routes)
app.use(errorHandler);

export default app;
