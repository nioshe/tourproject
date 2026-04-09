const express = require('express');
const router = express.Router();
const cityController = require('../controllers/city.controller');

// GET - Get all cities
router.get('/', cityController.getAllCities);

// GET - Get city by ID
router.get('/:cityId', cityController.getCityById);

// GET - Search cities
router.get('/search/:query', cityController.searchCities);

// GET - Get city attractions
router.get('/:cityId/attractions', cityController.getAttractions);

// GET - Get city hotels
router.get('/:cityId/hotels', cityController.getHotels);

module.exports = router;
