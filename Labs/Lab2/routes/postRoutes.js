let express = require("express");
let router = express.Router();
let Controllers = require("../controllers"); // index.js
let postController = require("../controllers/postcontrollers");


// POST route to create a new post
router.post('/create', (req, res) => {
    Controllers.postController.createPost(req.body, res);
})

//Update Post
router.put('/:id', (req, res) => {
Controllers.postController.updatePost(req, res)
})

//Delete Post
router.delete('/:id', (req, res) => {
Controllers.postController.deletePost(req, res)
})

//Like Post
router.post('/:postId/like', postController.likePost);

//Comment on a Post
router.post('/:postId/comment', postController.addComment);

module.exports = router;