const express = require('express');
const router = express.Router();
const Post = require('../models/postModel');

const handlePublicPosts = async (req, res) => {

    // This will be sent as json response
    const transformPost = (post) => {
        return {
            id: post._id.toString(),
            title: post.title,
            description: post.description,
            createdBy: post.createdBy,
            createdAt: post.createdAt,
            totalVotes: post.totalVotes,
        }
    };

    try {
        let posts = await Post.find().exec();
        posts = posts.map(transformPost);
        return res.status(200).json(posts);
    } catch (err) {
        return res.status(501).json({ "error" : err.message });
    }
};

router.route('/posts').get(handlePublicPosts);
module.exports = router;
