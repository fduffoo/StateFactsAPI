// verifyState.test.js
const verifyState = require('../middleware/verifyState');
const statesJSONData = require('../model/statesData.json');
const supertest = require('supertest');
const express = require('express');

// Mocking the states data
jest.mock('../model/statesData.json', () => [
    { name: 'California', code: 'CA' },
    { name: 'Texas', code: 'TX' },
    { name: 'New York', code: 'NY' },
]);

describe('verifyState middleware', () => {
    let app;

    beforeEach(() => {
        app = express();
        app.use('/:state', verifyState(), (req, res) => {
            res.status(200).json({ message: `State verified: ${req.code}` });
        });
    });

    it('should call next if the state exists in the data', async () => {
        const response = await supertest(app).get('/CA');
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('State verified: CA');
    });

    it('should return 404 if the state does not exist', async () => {
        const response = await supertest(app).get('/ZZ');
        expect(response.statusCode).toBe(404);
        expect(response.body.message).toBe('State not found');
    });

    it('should handle lowercase state codes by converting them to uppercase', async () => {
        const response = await supertest(app).get('/tx');
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('State verified: TX');
    });

    it('should return 404 if no state code is provided in the request', async () => {
        const response = await supertest(app).get('/');
        expect(response.statusCode).toBe(404); // This is what your middleware would return when no state code is provided
        expect(response.body.message).toBe('State not found');
    });
});
