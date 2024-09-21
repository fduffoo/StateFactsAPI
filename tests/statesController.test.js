const express = require('express');
const request = require('supertest');
const app = express();
const { getAllStates } = require('../controllers/statesController');
const State = require('../model/State');

// Mock the State model
jest.mock('../model/State');

app.use(express.json());
app.get('/states', getAllStates); // Set up the route for the test

describe('GET /states', () => {
    it('should return a list of states', async () => {
        // Mock data returned from MongoDB
        State.find.mockResolvedValue([{ stateCode: 'CA', funfacts: ['Fact 1', 'Fact 2'] }]);
        
        const response = await request(app).get('/states');

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true); // Check if the response is an array
    }, 10000); // Set timeout to 10 seconds
});
