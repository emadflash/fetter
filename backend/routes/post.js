const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

router.route('/').post(postController.handlePublish);
router.route('/').get(postController.handleFetch);
router.route('/fetch_all').get(postController.handleFetchAll);
router.route('/upvote').post(postController.handleUpvote);
router.route('/downvote').post(postController.handleDownvote);
router.route('/save').post(postController.handleSave);
router.route('/unsave').post(postController.handleUnsave);
router.route('/fetch_saved').get(postController.retrieveSavedPosts);
router.route('/fetch_upvoted').get(postController.retrieveUpvotedPosts);
router.route('/fetch_downvoted').get(postController.retrieveDownvotedPosts);

module.exports = router;
