const { logEvents } = require('./logEvents');

const errorHandler = (err, req, res, next) => {
    // Log the error details
    logEvents(`${err.name}: ${err.message}\nStack Trace: ${err.stack}\nRequest URL: ${req.originalUrl}`, 'errLog.txt');

    // Log error stack to console
    console.error(err.stack);

    // Respond with error message and status
    res.status(err.statusCode || 500).json({
        message: err.message || 'Internal Server Error',
        // Optionally include more details about the error for development
        // stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
}

module.exports = errorHandler;
