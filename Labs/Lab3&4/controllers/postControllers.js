const Post = require('../models/posts');
const User = require('../models/users');
const Comment = require('../models/comments');
const Like = require('../models/likes');

// Create a new post
exports.createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const user = await User.findByPk(req.user.id);

    if (!user) return res.status(404).json({ message: 'User not found' });

    const newPost = await Post.create({
      title,
      content,
      user_id: user.id
    });

    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all posts
exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.findAll({ include: [User, Comment, Like] });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add a comment to a post
exports.addComment = async (req, res) => {
  try {
    const { content } = req.body;
    const post = await Post.findByPk(req.params.postId);

    if (!post) return res.status(404).json({ message: 'Post not found' });

    const comment = await Comment.create({
      content,
      user_id: req.user.id,
      post_id: post.id
    });

    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Like a post
exports.likePost = async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.postId);

    if (!post) return res.status(404).json({ message: 'Post not found' });

    const existingLike = await Like.findOne({
      where: { user_id: req.user.id, post_id: post.id }
    });

    if (existingLike) return res.status(400).json({ message: 'Already liked this post' });

    const like = await Like.create({ user_id: req.user.id, post_id: post.id });
    res.status(200).json(like);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};