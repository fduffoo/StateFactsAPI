const request = require('supertest');
const app = require('../server');  // Your main server app

describe('State Facts API', () => {
  it('should get all states', async () => {
    const res = await request(app).get('/api/states');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveLength(50);  // Assuming there are 50 states
  });

  it('should return a specific state by name', async () => {
    const res = await request(app).get('/api/states/california');
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe('California');
  });
});
