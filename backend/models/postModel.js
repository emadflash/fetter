const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
    createdBy: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: '',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    totalVotes: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('Post', postSchema);