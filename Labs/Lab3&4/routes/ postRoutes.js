const express = require('express');
const router = express.Router();
const { createPost, getPosts, addComment, likePost } = require('../controllers/postControllers');
const { verifyToken } = require('../middleware/authMiddleware');

router.post('/posts', verifyToken, createPost);
router.get('/posts', getPosts);
router.post('/posts/:postId/comments', verifyToken, addComment);
router.post('/posts/:postId/like', verifyToken, likePost);

module.exports = router;