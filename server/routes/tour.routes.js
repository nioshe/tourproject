const express = require('express');
const router = express.Router();
const tourController = require('../controllers/tour.controller');

// GET - Get all tours
router.get('/', tourController.getAllTours);

// GET - Get tour by ID
router.get('/:tourId', tourController.getTourById);

// GET - Get tours by city
router.get('/city/:cityId', tourController.getToursByCity);

// GET - Get featured tours
router.get('/featured', tourController.getFeaturedTours);

// POST - Search tours with filters
router.post('/search', tourController.searchTours);

// GET - Get tour reviews
router.get('/:tourId/reviews', tourController.getTourReviews);

module.exports = router;
