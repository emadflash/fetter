const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const downvotedPostSchema = new Schema({
    downvotedBy: {
        type: String,
        required: true,
    },
    postId: {
        type: Schema.Types.ObjectId,
        required: true,
    },
});

module.exports = mongoose.model('DownvotedPost', downvotedPostSchema);

