const express = require('express');
const { getUserProfile, followUser } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/:id', authMiddleware, getUserProfile);
router.post('/:id/follow', authMiddleware, followUser);

module.exports = router;