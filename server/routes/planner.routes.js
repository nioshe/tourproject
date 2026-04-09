const express = require('express');
const router = express.Router();
const plannerController = require('../controllers/planner.controller');

// POST - Create a new trip plan
router.post('/create', plannerController.createPlan);

// GET - Get trip plan by ID
router.get('/:planId', plannerController.getPlan);

// GET - Get all plans by user
router.get('/user/:userId', plannerController.getUserPlans);

// PUT - Update trip plan
router.put('/:planId', plannerController.updatePlan);

// DELETE - Delete trip plan
router.delete('/:planId', plannerController.deletePlan);

// POST - Get recommendations
router.post('/recommend', plannerController.getRecommendations);

module.exports = router;
