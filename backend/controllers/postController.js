const Post = require('../models/Post');
const Comment = require('../models/Comment');
const User = require('../models/User');


// Get all posts
const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate('user', 'name').populate('comments');
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single post by ID
const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('user', 'name')
      .populate({
        path: 'comments',
        populate: { path: 'user', select: 'name' }
      });

    if (!post) return res.status(404).json({ error: 'Post not found' });

    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// Create a post
const createPost = async (req, res) => {
  const { content, media } = req.body;
  try {
    const post = new Post({ user: req.userId, content, media });
    await post.save();
    await User.findByIdAndUpdate(req.userId, { $push: { posts: post._id } });
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Edit a post (Only owner can edit)
const editPost = async (req, res) => {
  const { content, media } = req.body;
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });

    if (post.user.toString() !== req.userId) {
      return res.status(403).json({ error: 'Unauthorized to edit this post' });
    }

    post.content = content;
    post.media = media;
    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a post (Only owner can delete)
const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });

    if (post.user.toString() !== req.userId) {
      return res.status(403).json({ error: 'Unauthorized to delete this post' });
    }

    await post.deleteOne();
    await User.findByIdAndUpdate(req.userId, { $pull: { posts: post._id } });
    res.json({ message: 'Post deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Like a post (Only authenticated users can like)
const likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });

    if (post.likes.includes(req.userId)) {
      post.likes = post.likes.filter((id) => id.toString() !== req.userId);
    } else {
      post.likes.push(req.userId);
    }
    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add a comment to a post (Only authenticated users can comment)
const addComment = async (req, res) => {
  const { text } = req.body;
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });

    const comment = new Comment({ user: req.userId, post: req.params.id, text });
    await comment.save();
    await Post.findByIdAndUpdate(req.params.id, { $push: { comments: comment._id } });
    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { createPost, editPost, deletePost, likePost, addComment ,getAllPosts,getPostById};
