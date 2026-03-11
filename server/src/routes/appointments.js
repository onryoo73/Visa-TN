const express = require('express');
const router = express.Router();
const controller = require('../controllers/appointmentController');
const adminAuth = require('../middleware/adminAuth');

// Public: Create appointment
router.post('/', controller.createAppointment);

// Public: Get all appointments (frontend list)
router.get('/', controller.getAppointments);

// Public: Get available slots for a date
router.get('/available', controller.getAvailableSlots);

// Admin: Update appointment (e.g., change status)
router.patch('/:id', adminAuth, controller.updateAppointment);

// Admin: Delete appointment
router.delete('/:id', adminAuth, controller.deleteAppointment);

module.exports = router;
