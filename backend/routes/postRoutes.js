const express = require('express');
const {
  getAllPosts,
  getPostById,
  createPost,
  editPost,
  deletePost,
  likePost,
  addComment,
} = require('../controllers/postController'); // Ensure this path is correct
console.log(createPost)
const authMiddleware = require('../middleware/authMiddleware'); 
const router = express.Router();

// Routes
router.get('/', getAllPosts); // Get all posts
router.get('/:id', getPostById); // Get a single post
router.post('/',authMiddleware, createPost); // Ensure createPost is a function
router.put('/:id', authMiddleware, editPost);
router.delete('/:id', authMiddleware, deletePost);
router.post('/:id/like', authMiddleware, likePost);
router.post('/:id/comment', authMiddleware, addComment);

module.exports = router;