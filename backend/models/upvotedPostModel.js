const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const upvotedPostSchema = new Schema({
    upvotedBy: {
        type: String,
        required: true,
    },
    postId: {
        type: Schema.Types.ObjectId,
        required: true,
    },
});

module.exports = mongoose.model('UpvotedPost', upvotedPostSchema);