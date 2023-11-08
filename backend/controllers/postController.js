const Post = require('../models/postModel');
const User = require('../models/userModel');
const SavedPost = require('../models/savedPostModel');
const UpvotedPost = require('../models/upvotedPostModel');
const DownvotedPost = require('../models/downvotedPostModel');

const handlePublish = async (req, res) => {
    const { username, title, description } = req.body;

    if (!title) {
        return res.status(400).json({ "error": "username and title are missing" });
    }

    const foundUser = await User.findOne({ username: username }).exec();
    if (!foundUser) {
        return res.sendStatus(401).json({'error' : "user not found"});
    }

    try {
        await Post.create({
            createdBy: username,
            title: title,
            description: description
        });
        res.status(201).json({ "message": `created post titled '${title}'` })
    } catch (err) {
        res.status(501).json({ "error": err.message })
    }
};

const transformPost = async (post, username) => {
    const isSaved = await SavedPost.exists({ savedBy: username, postId: post._id.toString() });
    const isUpvoted = await UpvotedPost.exists({ upvotedBy: username, postId: post._id.toString() });
    const isDownvoted = await DownvotedPost.exists({ downvotedBy: username, postId: post._id.toString() });

    return {
        id: post._id.toString(),
        createdBy: post.createdBy,
        title: post.title,
        description: post.description,
        createdAt: post.createdAt,
        totalVotes: post.totalVotes,
        isSaved: isSaved ? true : false,
        isUpvoted: isUpvoted ? true : false,
        isDownvoted: isDownvoted ? true : false,
    }
};

const handleFetch = async (req, res) => {
    const { username } = req.body;
    const foundUser = await User.findOne({ username: username }).exec();
    if (!foundUser) {
        return res.sendStatus(401);
    }

    try {
        let posts = await Post.find({ createdBy: username })
            .exec();
        const transformedPosts = await Promise.all(posts.map(post => transformPost(post, username)));
        return res.status(200).json(transformedPosts);
    } catch (err) {
        res.status(501).json({ "error" : err.message })
    }
};

const handleFetchAll = async (req, res) => {
    const { username } = req.body;
    const foundUser = await User.findOne({ username: username }).exec();
    if (!foundUser) {
        return res.sendStatus(401);
    }

    try {
        let posts = await Post.find()
            .exec();
        const transformedPosts = await Promise.all(posts.map(post => transformPost(post, username)));
        return res.status(200).json(transformedPosts);
    } catch (err) {
        res.status(501).json({ "error" : err.message })
    }
};

const doesPostExists = async (postId) => {
    const post = await Post.findById(postId)
        .exec();
    return (post != null);
};

const handleUpvote = async (req, res) => {
    const { username, id } = req.body;
    if (!id) {
        return res.status(400).json({"error" : "Post ID missing"})
    }
    const foundUser = await User.findOne({ username: username }).exec();
    if (!foundUser) {
        return res.sendStatus(401);
    }

    try {
        if (!doesPostExists(id)) {
            return res.status(401).json({ "error" : `Invalid post id`});
        }

        const foundUpvotedPost = await UpvotedPost.find({ upvotedBy: username, postId: id}).exec();
        if (foundUpvotedPost && foundUpvotedPost.length != 0) {
            return res.status(401).json({ "error" : `Post(${id}) already upvoted`});
        }

        // NOTE: Remove post from downvoted post before upvoting
        const foundDownvotedPost = await DownvotedPost.find({ downvotedBy: username, postId: id}).exec();
        let wasDownvotedBefore = false;
        if (foundDownvotedPost && foundDownvotedPost.length != 0) {
            wasDownvotedBefore = true;
            await DownvotedPost.deleteOne({ downvotedBy: username, postId: id});
        }

        await UpvotedPost.create({
            upvotedBy: username,
            postId: id,
        });

        const post = await Post.findById(id)
            .exec();
        post.totalVotes = wasDownvotedBefore ? 2 : 1;
        post.save();
        res.status(200).json({ "message" : `upvoted post with id '${id}'` });
    } catch (err) {
        res.status(501).json({ "error" : err.message })
    }
}

const handleDownvote = async (req, res) => {
    const { username, id } = req.body;
    if (!id) {
        return res.status(400).json({"error" : "Post ID missing"})
    }
    const foundUser = await User.findOne({ username: username }).exec();
    if (!foundUser) {
        return res.sendStatus(401);
    }

    try {
        if (!doesPostExists(id)) {
            return res.status(401).json({ "error" : `Invalid post id`});
        }

        const foundDownvotedPost = await DownvotedPost.find({ downvotedBy: username, postId: id }).exec();
        if (foundDownvotedPost && foundDownvotedPost.length != 0) {
            return res.status(401).json({ "error" : `Post(${id}) already downvoted`});
        }

        // NOTE: Remove post from upvoted post before downvoting
        const foundUpvotedPost = await UpvotedPost.find({ upvotedBy: username, postId: id }).exec();
        let wasUpvotedBefore = false;
        if (foundUpvotedPost && foundUpvotedPost.length != 0) {
            wasUpvotedBefore = true;
            await UpvotedPost.deleteOne({ upvotedBy: username, postId: id });
        }

        await DownvotedPost.create({
            downvotedBy: username,
            postId: id,
        });

        const post = await Post.findById(id)
            .exec();
        post.totalVotes += wasUpvotedBefore ? -2 : -1;
        post.save();
        res.status(200).json({ "message" : `downvoted post with id '${id}'` });
    } catch (err) {
        res.status(501).json({ "error" : err.message })
    }
};

const handleSave = async (req, res) => {
    const { username, id } = req.body;
    if (!id) {
        return res.status(400).json({"error" : "Post ID missing"})
    }
    const foundUser = await User.findOne({ username: username }).exec();
    if (!foundUser) {
        return res.sendStatus(401);
    }

    const isAlreadySaved = await SavedPost.findOne({ savedBy: username, postId: id});
    if (isAlreadySaved) {
        return res.status(401).json({ "error" : `Post(${id}) already saved` });
    }

    try {
        await SavedPost.create({
            savedBy: username,
            postId: id,
        });
        return res.status(201).json({ "message": `Post(${id}) saved` });
    } catch (err) {
        return res.status(401);
    }
};

const handleUnsave = async (req, res) => {
    const { username, id } = req.body;
    if (!id) {
        return res.status(400).json({"error" : "Post ID missing"})
    }
    const foundUser = await User.findOne({ username: username }).exec();
    if (!foundUser) {
        return res.sendStatus(401);
    }

    const isAlreadySaved = await SavedPost.findOne({ savedBy: username, postId: id });
    if (!isAlreadySaved) {
        return res.status(401).json({ "error" : `Post(${id}) not present` });
    }

    SavedPost.deleteOne({ savedBy: username, postId: id},)
    .then(() => res.status(201).json({ "message": `Post('${id}') deleted` }))
    .catch((err) => {
        res.status(401).json({ "error" : err.message });
    });
};

const retrieveSavedPosts = async (req, res) => {
    const { username } = req.body;
    const foundUser = await User.findOne({ username: username }).exec();
    if (!foundUser) {
        return res.sendStatus(401);
    }

    try {
        const savedPosts = await SavedPost.find({ savedBy: username }).exec();
        const postIds = savedPosts.map((savedPost) => savedPost.postId);
        const posts = await Post.find({ _id: { $in: postIds } }).exec();
        const transformedPosts = await Promise.all(posts.map(post => transformPost(post, username)));
        return res.status(200).json(transformedPosts);
    } catch (err) {
        return res.status(501).json({ "error" : err.message });
    }
};

const retrieveUpvotedPosts = async (req, res) => {
    const { username } = req.body;
    const foundUser = await User.findOne({ username: username }).exec();
    if (!foundUser) {
        return res.sendStatus(401);
    }

    try {
        const upvotedPosts = await UpvotedPost.find({ upvotedBy: username }).exec();
        const postIds = upvotedPosts.map((upvotedPost) => upvotedPost.postId);
        const posts = await Post.find({ _id: { $in: postIds } }).exec();
        const transformedPosts = await Promise.all(posts.map(post => transformPost(post, username)));
        return res.status(200).json(transformedPosts);
    } catch (err) {
        return res.status(501).json({ "error" : err.message });
    }
};

const retrieveDownvotedPosts = async (req, res) => {
    const { username } = req.body;
    const foundUser = await User.findOne({ username: username }).exec();
    if (!foundUser) {
        return res.sendStatus(401);
    }

    try {
        const downvotedPosts = await DownvotedPost.find({ downvotedBy: username }).exec();
        const postIds = downvotedPosts.map((downvotedPost) => downvotedPost.postId);
        const posts = await Post.find({ _id: { $in: postIds } }).exec();
        const transformedPosts = await Promise.all(posts.map(post => transformPost(post, username)));
        return res.status(200).json(transformedPosts);
    } catch (err) {
        return res.status(501).json({ "error" : err.message });
    }
};

module.exports = {
    handlePublish,
    handleFetch,
    handleFetchAll,
    handleUpvote,
    handleDownvote,
    handleSave,
    handleUnsave,
    retrieveSavedPosts,
    retrieveUpvotedPosts,
    retrieveDownvotedPosts
};
