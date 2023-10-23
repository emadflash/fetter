const User = require('../models/userModel');
const bcrpyt = require('bcrypt');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const handleLogin = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password)
        return res.status(400).json({ "message": "username and password required" });

    const foundUser = await User.findOne({ username: username }).exec();
    if (!foundUser) {
        return res.sendStatus(401);
    }

    try {
        const match = await bcrpyt.compare(password, foundUser.password);
        if (match) {
            const accessToken = jwt.sign(
                { "username": username },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '1d' }
            );

            const refreshToken = jwt.sign(
                { "username": username },
                process.env.REFRESH_TOKEN_SECRET,
                { expiresIn: '1d' }
            );

            foundUser.refreshToken = refreshToken;
            foundUser.save();
            res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 });
            res.json({ accessToken });
        } else {
            res.sendStatus(401);
        }
    } catch (err) {
        res.status(500).json({ "error": err.message });
    }
}

const handleSignUp = async (req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    if (!username || !email || !password) {
        res.status(400).json({ "error": "username, email and password required" });
        return;
    }

    // Check if user already exists in database
    const duplicate = await User.findOne({ username: username }).exec();
    if (duplicate) return res.status(409).json({ "error": "user already exists" }); // conflict

    try {
        const hashPassword = await bcrpyt.hash(password, 10);
        const result = await User.create({
            username: username,
            password: hashPassword,
            email: email
        });
        res.status(201).json({ "message": `created user ${username}` })
    } catch (err) {
        res.status(501).json({ "error": err.message });
    }
}

const handleLogout = async (req, res) => {
    // On client, also delete the accessToken

    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;

    const foundUser = await User.findOne({ refreshToken: refreshToken });
    if (!foundUser) {
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
        return res.sendStatus(204);
    }

    // Delete refreshToken in databse
    foundUser.refreshToken = "";
    foundUser.save();
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    return res.sendStatus(200);
}

module.exports = { handleLogin, handleSignUp, handleLogout }
