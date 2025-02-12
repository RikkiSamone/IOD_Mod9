"use strict";
let Models = require("../models"); // matches index.js
let Post = require ("../models/posts.js")
let User = require("../models/user.js")

//create a new post

exports.createPost = async (req, res) => {
  try {
    const { title, content, userId } = req.body;

    // Ensure user exists
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Create new post
    const newPost = new Post({
      title: req.body.title,
      content: req.body.content,
      author: userId
      });
      
const savedPost = await newPost.save();

    // Add post reference to the user
    user.posts.push(savedPost._id);
    await user.save();

    res.status(201).json(savedPost);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a post
exports.updatePost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true }
    );

    if (!updatedPost) return res.status(404).json({ message: "Post not found" });

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a post
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Like a Post
exports.likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);

    // Check if user already liked the post
    if (post.likes.includes(req.body.userId)) {
      return res.status(400).json({ message: "You already liked this post." });
    }

    // Add the user to the likes array
    post.likes.push(req.body.userId);
    await post.save();

    res.status(200).json({ message: "Post liked!", post });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a Comment
exports.addComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);

    // Create a new comment object
    const newComment = {
      content: req.body.content,
      author: req.body.userId,
    };

    // Add the new comment to the comments array
    post.comments.push(newComment);
    await post.save();

    res.status(201).json({ message: "Comment added!", post });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

