const express = require('express');
const router = express.Router();
const controller = require('../controllers/appointmentController');
const adminAuth = require('../middleware/adminAuth');

// Public: Create appointment (anyone can book)
router.post('/', controller.createAppointment);

// Admin only: list appointments (keeps names/phones private)
router.get('/', adminAuth, controller.getAppointments);

// Public: Get available slots for a date
router.get('/available', controller.getAvailableSlots);

// Admin: Update appointment (e.g., change status)
router.patch('/:id', adminAuth, controller.updateAppointment);

// Admin: Delete appointment
router.delete('/:id', adminAuth, controller.deleteAppointment);

module.exports = router;
