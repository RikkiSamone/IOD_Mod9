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
      title,
      content,
      author: userId,
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

