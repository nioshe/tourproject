const plannerService = require('../services/planner.service');
const recommendationService = require('../services/recommendation.service');

// Create a new trip plan
exports.createPlan = async (req, res) => {
  try {
    const { userId, budget, duration, cities, startDate, travelers, tripStyle } = req.body;

    if (!userId || !budget || !duration || !cities) {
      return res.status(400).json({
        success: false,
        message: 'userId, budget, duration, and cities are required',
      });
    }

    const plan = await plannerService.createPlan({
      userId,
      budget,
      duration,
      cities,
      startDate,
      travelers,
      tripStyle,
    });

    res.status(201).json({
      success: true,
      data: plan,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get trip plan by ID
exports.getPlan = async (req, res) => {
  try {
    const { planId } = req.params;

    if (!planId) {
      return res.status(400).json({
        success: false,
        message: 'planId is required',
      });
    }

    const plan = await plannerService.getPlanById(planId);

    if (!plan) {
      return res.status(404).json({
        success: false,
        message: 'Plan not found',
      });
    }

    res.status(200).json({
      success: true,
      data: plan,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get all plans by user
exports.getUserPlans = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: 'userId is required',
      });
    }

    const plans = await plannerService.getUserPlans(userId);

    res.status(200).json({
      success: true,
      data: plans,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update trip plan
exports.updatePlan = async (req, res) => {
  try {
    const { planId } = req.params;
    const updateData = req.body;

    if (!planId) {
      return res.status(400).json({
        success: false,
        message: 'planId is required',
      });
    }

    const updatedPlan = await plannerService.updatePlan(planId, updateData);

    res.status(200).json({
      success: true,
      data: updatedPlan,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete trip plan
exports.deletePlan = async (req, res) => {
  try {
    const { planId } = req.params;

    if (!planId) {
      return res.status(400).json({
        success: false,
        message: 'planId is required',
      });
    }

    await plannerService.deletePlan(planId);

    res.status(200).json({
      success: true,
      message: 'Plan deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get recommendations
exports.getRecommendations = async (req, res) => {
  try {
    const { budget, duration, interests, travelers, tripStyle } = req.body;

    if (!budget || !duration) {
      return res.status(400).json({
        success: false,
        message: 'budget and duration are required',
      });
    }

    const recommendations = await recommendationService.getRecommendations({
      budget,
      duration,
      interests,
      travelers,
      tripStyle,
    });

    res.status(200).json({
      success: true,
      data: recommendations,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
