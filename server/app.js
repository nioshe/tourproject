const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Import routes
const chatRoutes = require('./routes/chat.routes');
const plannerRoutes = require('./routes/planner.routes');
const appointmentRoutes = require('./routes/appointment.routes');
const cityRoutes = require('./routes/city.routes');
const tourRoutes = require('./routes/tour.routes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Rahla.AI API is running' });
});

// Routes
app.use('/api/chat', chatRoutes);
app.use('/api/planner', plannerRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/cities', cityRoutes);
app.use('/api/tours', tourRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    status: 404,
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
    status: err.status || 500,
  });
});

module.exports = app;
