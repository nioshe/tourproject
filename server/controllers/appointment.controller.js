const appointmentService = require('../services/appointment.service');

// Book an appointment
exports.bookAppointment = async (req, res) => {
  try {
    const { userId, tourId, date, guests, contactInfo } = req.body;

    if (!userId || !tourId || !date || !guests) {
      return res.status(400).json({
        success: false,
        message: 'userId, tourId, date, and guests are required',
      });
    }

    const appointment = await appointmentService.bookAppointment({
      userId,
      tourId,
      date,
      guests,
      contactInfo,
    });

    res.status(201).json({
      success: true,
      data: appointment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get appointment details
exports.getAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.params;

    if (!appointmentId) {
      return res.status(400).json({
        success: false,
        message: 'appointmentId is required',
      });
    }

    const appointment = await appointmentService.getAppointmentById(appointmentId);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found',
      });
    }

    res.status(200).json({
      success: true,
      data: appointment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get user's appointments
exports.getUserAppointments = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: 'userId is required',
      });
    }

    const appointments = await appointmentService.getUserAppointments(userId);

    res.status(200).json({
      success: true,
      data: appointments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update appointment
exports.updateAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.params;
    const updateData = req.body;

    if (!appointmentId) {
      return res.status(400).json({
        success: false,
        message: 'appointmentId is required',
      });
    }

    const updatedAppointment = await appointmentService.updateAppointment(appointmentId, updateData);

    res.status(200).json({
      success: true,
      data: updatedAppointment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Cancel appointment
exports.cancelAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.params;

    if (!appointmentId) {
      return res.status(400).json({
        success: false,
        message: 'appointmentId is required',
      });
    }

    await appointmentService.cancelAppointment(appointmentId);

    res.status(200).json({
      success: true,
      message: 'Appointment cancelled successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Check availability
exports.checkAvailability = async (req, res) => {
  try {
    const { tourId } = req.params;
    const { date } = req.query;

    if (!tourId || !date) {
      return res.status(400).json({
        success: false,
        message: 'tourId and date are required',
      });
    }

    const availability = await appointmentService.checkAvailability(tourId, date);

    res.status(200).json({
      success: true,
      data: availability,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
