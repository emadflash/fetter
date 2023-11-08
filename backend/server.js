const express = require('express')
const app = express();
const PORT = process.env.PORT || 8080
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const DATABASE_URI = process.env.DATABASE_URI || "mongodb://localhost:27017/cluster0";

const connectDB = async () => {
    try {
        await mongoose.connect(DATABASE_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    } catch (err) {
        console.error(err);
    }
};

connectDB();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

// These routes don't require auth token
app.use('/api/user', require('./routes/user'));
app.use('/api/refresh', require('./routes/refresh'));
app.use('/api/public', require('./routes/public'));

// These routes require auth token
const verifyJWT = require('./middleware/verifyJWT');
app.get('/api/ping', verifyJWT, (req, res) => {
    res.send("pong!")
})
app.use('/api/post', verifyJWT, require('./routes/post'));

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
})
