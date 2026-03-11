const mongoose = require('mongoose');

// Connect to MongoDB using the MONGODB_URI environment variable.
// Export the connect function so the app can initialize DB on startup.
const connectDB = async (mongoUri) => {
  try {
    await mongoose.connect(mongoUri, {
      // Mongoose 7+ has sensible defaults but keep options for clarity
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
