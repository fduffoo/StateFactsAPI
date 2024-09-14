require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const corsOptions = require('./config/corsOptions');
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const credentials = require('./middleware/credentials');
const connectDB = require('./config/dbConn');

const app = express();
const PORT = process.env.PORT || 3000;

// Suppress Mongoose warning
mongoose.set('strictQuery', true);

// Connect to MongoDB
connectDB();

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
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
