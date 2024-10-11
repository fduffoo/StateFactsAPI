const { format } = require('date-fns');
const { v4: uuid } = require('uuid');
const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

const logDirectory = path.join(__dirname, '..', 'logs');

// Ensure the logs directory exists
const ensureLogDirectory = async () => {
    try {
        if (!fs.existsSync(logDirectory)) {
            await fsPromises.mkdir(logDirectory);
        }
    } catch (err) {
        console.error(`Failed to create log directory: ${err.message}`);
    }
};

const logEvents = async (message, logName) => {
    await ensureLogDirectory();
    const dateTime = format(new Date(), 'yyyyMMdd\tHH:mm:ss');
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`;
    try {
        await fsPromises.appendFile(path.join(logDirectory, logName), logItem);
    } catch (err) {
        console.error(`Failed to write log: ${err.message}`);
    }
};

const logger = (req, res, next) => {
    logEvents(`${req.method}\t${req.headers.origin || 'Unknown Origin'}\t${req.url}`, 'reqLog.txt')
        .catch(err => console.error(`Failed to log request: ${err.message}`));
    console.log(`${req.method} ${req.path}`);
    next();
};

module.exports = { logger, logEvents };
