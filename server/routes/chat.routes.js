const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chat.controller');

// POST - Send a chat message to AI
router.post('/message', chatController.sendMessage);

// GET - Get chat history
router.get('/history/:userId', chatController.getChatHistory);

// POST - Clear chat history
router.post('/clear/:userId', chatController.clearHistory);

module.exports = router;
