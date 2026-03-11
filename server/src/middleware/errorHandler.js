// Centralized error-handling middleware for Express
const errorHandler = (err, req, res, next) => {
  console.error(err);

  // Mongoose duplicate key error
  if (err.code && err.code === 11000) {
    return res.status(409).json({ success: false, message: 'Time slot already booked' });
  }

  // Mongoose validation errors
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map((val) => val.message);
    return res.status(400).json({ success: false, message: messages.join(', ') });
  }

  // Default to 500
  res.status(err.statusCode || 500).json({ success: false, message: err.message || 'Server Error' });
};

module.exports = errorHandler;
