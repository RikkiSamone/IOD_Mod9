const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const commentSchema = new Schema({
    content: {
        type: String,
        required: true,
        trim: true,
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
}); 

const postSchema = new Schema({
    title: { type: String, required: true },
    content: { type: String, trim: true, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
    image: [{ type: String }],
    comments: [commentSchema],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});



module.exports = mongoose.model("post", postSchema);
