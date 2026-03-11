const path = require('path');
// Load .env from server folder so ADMIN_TOKEN is always found when running from server/
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const connectDB = require('./config/db');
const appointmentsRouter = require('./routes/appointments');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('dev'));

// Connect to DB
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://bommbala8_db_user:rpC1AXcCpywcv8CY@vcard.yeavkrg.mongodb.net/';
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
