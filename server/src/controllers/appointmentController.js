const Appointment = require('../models/Appointment');

// Helper: parse a date string (YYYY-MM-DD or ISO) and return a Date at start of day (00:00)
const parseDateOnly = (dateStr) => {
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return null;
  // set to start of day UTC to normalize comparisons
  const utc = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), 0, 0, 0, 0));
  return utc;
};

// Helper: build a Date from date-only and time string 'HH:mm'
const buildDateTime = (dateOnly, timeStr) => {
  const [hour, minute] = timeStr.split(':').map((v) => parseInt(v, 10));
  if (Number.isNaN(hour) || Number.isNaN(minute)) return null;
  // dateOnly is a Date at 00:00 UTC
  const dt = new Date(dateOnly);
  dt.setUTCHours(hour, minute, 0, 0);
  return dt;
};

// POST /api/appointments
// Creates a new appointment after validating inputs and checking for duplicates/past dates.
exports.createAppointment = async (req, res, next) => {
  try {
    const { name, phone, appointmentDate, appointmentTime } = req.body;

    // Basic required field validation
    if (!name || !phone || !appointmentDate || !appointmentTime) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    // Parse date-only (normalize to start of day)
    const dateOnly = parseDateOnly(appointmentDate);
    if (!dateOnly) return res.status(400).json({ success: false, message: 'Invalid appointmentDate' });

    // Build combined DateTime to check for past booking
    const dt = buildDateTime(dateOnly, appointmentTime);
    if (!dt) return res.status(400).json({ success: false, message: 'Invalid appointmentTime format. Expected HH:mm' });

    if (dt.getTime() < Date.now()) {
      return res.status(400).json({ success: false, message: 'Cannot book an appointment in the past' });
    }

    // Prevent duplicate booking for same date + time (model has a unique index but we check first)
    const existing = await Appointment.findOne({ appointmentDate: dateOnly, appointmentTime });
    if (existing) {
      return res.status(409).json({ success: false, message: 'Time slot already booked' });
    }

    // Create the appointment (appointmentDate stored as date-only)
    const appointment = await Appointment.create({ name, phone, appointmentDate: dateOnly, appointmentTime });

    return res.status(201).json({ success: true, message: 'Appointment created', data: appointment });
  } catch (err) {
    return next(err);
  }
};

// GET /api/appointments
// Returns all appointments sorted by newest first
exports.getAppointments = async (req, res, next) => {
  try {
    const appointments = await Appointment.find().sort({ createdAt: -1 });
    res.json({ success: true, count: appointments.length, data: appointments });
  } catch (err) {
    next(err);
  }
};

// GET /api/appointments/available?date=YYYY-MM-DD
// Returns available time slots for a given date by subtracting booked times from full schedule
exports.getAvailableSlots = async (req, res, next) => {
  try {
    const { date } = req.query;
    if (!date) return res.status(400).json({ success: false, message: 'date query parameter is required (YYYY-MM-DD)' });

    const dateOnly = parseDateOnly(date);
    if (!dateOnly) return res.status(400).json({ success: false, message: 'Invalid date' });

    // Define working hours and slot interval (can be adjusted)
    const startHour = 9; // 09:00
    const endHour = 17; // 17:00
    const slotMinutes = 30;

    // Build all possible slots as 'HH:mm' strings
    const slots = [];
    for (let h = startHour; h < endHour; h++) {
      for (let m = 0; m < 60; m += slotMinutes) {
        const hh = String(h).padStart(2, '0');
        const mm = String(m).padStart(2, '0');
        slots.push(`${hh}:${mm}`);
      }
    }

    // Get booked appointments for that date
    const booked = await Appointment.find({ appointmentDate: dateOnly }).select('appointmentTime -_id');
    const bookedTimes = booked.map((b) => b.appointmentTime);

    // Filter out booked slots
    const available = slots.filter((s) => !bookedTimes.includes(s));

    res.json({ success: true, date: dateOnly.toISOString().slice(0, 10), available });
  } catch (err) {
    next(err);
  }
};

// DELETE /api/appointments/:id
// Removes an appointment by id
exports.deleteAppointment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await Appointment.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Appointment not found' });
    }
    res.json({ success: true, message: 'Appointment deleted' });
  } catch (err) {
    next(err);
  }
};

// PATCH /api/appointments/:id
// Allows admin to update appointment fields (currently only `status` supported)
exports.updateAppointment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updates = {};
    if (req.body.status) updates.status = req.body.status;

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ success: false, message: 'No valid fields to update' });
    }

    const appointment = await Appointment.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
    if (!appointment) return res.status(404).json({ success: false, message: 'Appointment not found' });

    res.json({ success: true, message: 'Appointment updated', data: appointment });
  } catch (err) {
    next(err);
  }
};
