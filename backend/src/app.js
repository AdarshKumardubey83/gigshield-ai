import express from 'express';
import cors from 'cors';
import { errorHandler } from './middlewares/error.middleware.js';
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import subscriptionRoutes from './routes/subscription.routes.js';
import weatherRoutes from './routes/weather.routes.js';
import path from 'path';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';
import dashboardRoutes from './routes/dashboard.routes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Enable CORS — must be before body/cookie parsers so preflight OPTIONS are handled correctly
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

// Body parser & Cookie parser
app.use(express.json());
app.use(cookieParser());

// Mount routers
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/subscription', subscriptionRoutes);
app.use('/api/weather', weatherRoutes);
app.use('/api/dashboard', dashboardRoutes);

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



