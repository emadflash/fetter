const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const savedPostSchema = new Schema({
    savedBy: {
        type: String,
        required: true,
    },
    postId: {
        type: Schema.Types.ObjectId,
        required: true,
    },
});

module.exports = mongoose.model('SavedPost', savedPostSchema);
