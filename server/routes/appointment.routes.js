const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointment.controller');

// POST - Book an appointment
router.post('/book', appointmentController.bookAppointment);

// GET - Get appointment details
router.get('/:appointmentId', appointmentController.getAppointment);

// GET - Get user's appointments
router.get('/user/:userId', appointmentController.getUserAppointments);

// PUT - Update appointment
router.put('/:appointmentId', appointmentController.updateAppointment);

// DELETE - Cancel appointment
router.delete('/:appointmentId', appointmentController.cancelAppointment);

// GET - Check availability
router.get('/availability/:tourId', appointmentController.checkAvailability);

module.exports = router;
