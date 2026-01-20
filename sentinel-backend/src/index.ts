import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment variables FIRST (before importing routes that may use them)
dotenv.config();

import path from 'path';
import { clerkMiddleware } from './middleware/auth';
import transactionsRouter from './routes/transactions';
import vatRouter from './routes/vat';
import documentsRouter from './routes/documents';
import notificationsRouter from './routes/notifications';
import gdprRouter from './routes/gdpr';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5174',
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Clerk authentication middleware (makes auth available on all routes)
if (process.env.CLERK_SECRET_KEY && !process.env.CLERK_SECRET_KEY.includes('YOUR_SECRET')) {
  app.use(clerkMiddleware());
  console.log('Clerk authentication enabled');
} else {
  console.log('Clerk authentication disabled (no secret key configured)');
}

// Request logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Static files (uploaded documents)
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// Routes
app.use('/api/transactions', transactionsRouter);
app.use('/api/vat', vatRouter);
app.use('/api/documents', documentsRouter);
app.use('/api/notifications', notificationsRouter);
app.use('/api/gdpr', gdprRouter);

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    name: 'Sentinel API',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      transactions: '/api/transactions',
      vatStatus: '/api/vat/status',
      documents: '/api/documents',
      notifications: '/api/notifications',
    },
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// Error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', err);
  res.status(500).json({
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
});

// Start server
app.listen(PORT, () => {
  console.log('');
  console.log('🛡️  Sentinel Backend Server');
  console.log('=====================================');
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Frontend URL: ${process.env.FRONTEND_URL}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log('=====================================');
  console.log('');
  console.log('Available endpoints:');
  console.log(`  GET    /health`);
  console.log(`  GET    /api/transactions`);
  console.log(`  POST   /api/transactions`);
  console.log(`  DELETE /api/transactions/:id`);
  console.log(`  GET    /api/vat/status`);
  console.log(`  GET    /api/documents`);
  console.log(`  POST   /api/documents`);
  console.log(`  PATCH  /api/documents/:id`);
  console.log(`  DELETE /api/documents/:id`);
  console.log('');
});
