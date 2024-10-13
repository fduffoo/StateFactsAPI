const request = require('supertest');
const app = require('../server');

let server; // Define a variable to hold the server instance

describe('State Facts API', () => {
    // Start the server before all tests
    beforeAll(async () => {
        // Ensure the server starts on a specific port
        server = app.listen(3001, () => console.log('Test server running on port 3002'));
    });

    // Close the server after all tests are done
    afterAll(async () => {
        await server.close(); // Close the server
    });

    it('should get all states', async () => {
        const res = await request(app).get('/api/states');
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveLength(50);
    });

    it('should return a specific state by name', async () => {
        const res = await request(app).get('/api/states/ca');
        expect(res.statusCode).toBe(200);
        expect(res.body.name).toBe('California');
    });

    it('should return a random fun fact for California', async () => {
        const res = await request(app).get('/api/states/ca/funfact');
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('funfact');
    });
});
