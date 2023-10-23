const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.route('/login').post(userController.handleLogin)
router.route('/signup').post(userController.handleSignUp)
router.route('/logout').post(userController.handleLogout)

module.exports = router;