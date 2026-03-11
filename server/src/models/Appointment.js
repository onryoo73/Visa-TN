const mongoose = require('mongoose');

// Define Appointment schema per requirements
const AppointmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, 'Phone is required'],
      trim: true,
      // Basic phone validation: allows digits, spaces, dashes, parentheses and leading +
      match: [/^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/, 'Please provide a valid phone number'],
    },
    // appointmentDate stores date-only (time set to start of day in controller)
    appointmentDate: {
      type: Date,
      required: [true, 'Appointment date is required'],
    },
    // appointmentTime stores time as 'HH:mm' string
    appointmentTime: {
      type: String,
      required: [true, 'Appointment time is required'],
      trim: true,
    },
    status: {
      type: String,
      default: 'pending',
      enum: ['pending', 'confirmed', 'cancelled', 'completed'],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    // Include virtuals when converting to JSON
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Compound index to prevent duplicate booking on the same date + time
AppointmentSchema.index({ appointmentDate: 1, appointmentTime: 1 }, { unique: true });

module.exports = mongoose.model('Appointment', AppointmentSchema);
