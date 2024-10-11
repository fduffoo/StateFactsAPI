// logEvents.test.js
const { logEvents, logger } = require('../middleware/logEvents');
const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');
const { v4: uuid } = require('uuid');
const { format } = require('date-fns');

jest.mock('fs');
jest.mock('fs').promises;
jest.mock('uuid', () => ({
    v4: jest.fn(() => 'test-uuid'),
}));
jest.mock('date-fns', () => ({
    format: jest.fn(() => '20240101\t12:00:00'),
}));

describe('logEvents', () => {
    const logDirectory = path.join(__dirname, '..', 'logs');

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should create log directory if it does not exist', async () => {
        fs.existsSync.mockReturnValue(false);
        fsPromises.mkdir.mockResolvedValue();

        await logEvents('Test message', 'testLog.txt');

        expect(fs.existsSync).toHaveBeenCalledWith(logDirectory);
        expect(fsPromises.mkdir).toHaveBeenCalledWith(logDirectory);
    });

    it('should append log item to file when directory exists', async () => {
        fs.existsSync.mockReturnValue(true);
        fsPromises.appendFile.mockResolvedValue();

        await logEvents('Test message', 'testLog.txt');

        const expectedLogItem = '20240101\t12:00:00\ttest-uuid\tTest message\n';
        expect(fsPromises.appendFile).toHaveBeenCalledWith(path.join(logDirectory, 'testLog.txt'), expectedLogItem);
    });

    it('should handle errors during directory creation or file writing', async () => {
        fs.existsSync.mockReturnValue(false);
        const mkdirError = new Error('Directory creation failed');
        const appendError = new Error('File append failed');

        fsPromises.mkdir.mockRejectedValue(mkdirError);
        fsPromises.appendFile.mockRejectedValue(appendError);

        console.error = jest.fn();

        await logEvents('Test message', 'testLog.txt');

        expect(console.error).toHaveBeenCalledWith(`Failed to create log directory: ${mkdirError.message}`);
        expect(console.error).toHaveBeenCalledWith(`Failed to write log: ${appendError.message}`);
    });
});

describe('logger middleware', () => {
    const mockRequest = {
        method: 'GET',
        headers: {
            origin: 'https://example.com',
        },
        url: '/test',
        path: '/test',
    };
    const mockResponse = {};
    const nextFunction = jest.fn();

    it('should log request and call next', async () => {
        jest.spyOn(console, 'log').mockImplementation(() => {});
        await logger(mockRequest, mockResponse, nextFunction);

        const expectedLogMessage = 'GET\thttps://example.com\t/test';
        expect(logEvents).toHaveBeenCalledWith(expectedLogMessage, 'reqLog.txt');
        expect(console.log).toHaveBeenCalledWith('GET /test');
        expect(nextFunction).toHaveBeenCalled();
    });

    it('should log "Unknown Origin" when origin header is missing', async () => {
        jest.spyOn(console, 'log').mockImplementation(() => {});
        const mockRequestWithoutOrigin = {
            method: 'POST',
            headers: {},
            url: '/test',
            path: '/test',
        };
        await logger(mockRequestWithoutOrigin, mockResponse, nextFunction);

        const expectedLogMessage = 'POST\tUnknown Origin\t/test';
        expect(logEvents).toHaveBeenCalledWith(expectedLogMessage, 'reqLog.txt');
        expect(console.log).toHaveBeenCalledWith('POST /test');
        expect(nextFunction).toHaveBeenCalled();
    });
});
