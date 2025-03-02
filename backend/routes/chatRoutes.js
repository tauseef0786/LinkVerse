const express = require('express');
const { sendMessage, getChat } = require('../controllers/chatController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/:userId', authMiddleware, sendMessage);
router.get('/:userId', authMiddleware, getChat);

module.exports = router;