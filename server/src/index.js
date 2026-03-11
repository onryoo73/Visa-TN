const path = require('path');
// Load .env from server folder — never commit .env or put real secrets in code
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const connectDB = require('./config/db');
const appointmentsRouter = require('./routes/appointments');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Security: never use a hardcoded DB URL — use server/.env only
const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error('Missing MONGODB_URI in server/.env. Add it and restart.');
  process.exit(1);
}

// Middleware
app.use(helmet({ contentSecurityPolicy: false })); // CSP off for API; enable if you serve HTML
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(morgan('dev'));

// CORS: restrict in production to your frontend origin
const corsOrigin = process.env.CORS_ORIGIN || '*';
app.use(cors({ origin: corsOrigin === '*' ? true : corsOrigin.split(',').map((o) => o.trim()) }));

// Rate limit: prevent abuse (e.g. booking spam)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 60,
  message: { success: false, message: 'Too many requests, try again later.' },
});
app.use('/api/appointments', limiter);

// Connect to DB
connectDB(MONGODB_URI);

// Routes
app.use('/api/appointments', appointmentsRouter);

// Health check
app.get('/health', (req, res) => res.json({ success: true, uptime: process.uptime() }));

// Error handler (should be after routes)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  if (!process.env.ADMIN_TOKEN) {
    console.warn('WARNING: ADMIN_TOKEN is not set in server/.env — PATCH and DELETE /api/appointments will return 403.');
  }
});
