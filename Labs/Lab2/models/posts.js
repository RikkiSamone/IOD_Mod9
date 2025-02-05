const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: { type: String, required: true },
    content: { type: String, trim: true, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
    comments: [{
        user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
        text: { type: String, required: true },
        createdAt: { type: Date, default: Date.now},
    }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("post", postSchema);
