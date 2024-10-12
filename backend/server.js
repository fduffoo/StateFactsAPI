require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const corsOptions = require('./config/corsOptions');
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const credentials = require('./middleware/credentials');
const connectDB = require('./config/dbConn');

const app = express();
const PORT = process.env.PORT || 3001;

// Suppress Mongoose warning
mongoose.set('strictQuery', true);

// Connect to MongoDB
(async () => {
    try {
        await connectDB();
    } catch (err) {
        console.error('MongoDB connection error:', err);
        process.exit(1); // Exit process with failure
    }
})();

// Middleware
app.use(logger); // Custom logger middleware
app.use(credentials); // Handle credentials before CORS
app.use(cors(corsOptions)); // CORS settings
app.use(express.urlencoded({ extended: false })); // Handle urlencoded form data
app.use(express.json()); // Handle JSON data
app.use(cookieParser()); // Cookie parser

// Serve static files
app.use('/', express.static(path.join(__dirname, '/public')));

// Routes
app.use('/', require('./routes/root'));
app.use('/states', require('./routes/api/states'));

// 404 Error handling for unsupported routes
app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')) {
        res.json({ error: "404 Not Found" });
    } else {
        res.type('txt').send("404 Not Found");
    }
});

// Custom error handler middleware
app.use(errorHandler);

// Start server after MongoDB connection is established
mongoose.connection.once('open', () => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
