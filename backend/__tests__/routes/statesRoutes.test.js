const request = require('supertest');
const app = require('../../server');  // Adjust the path to your server

describe('GET /api/states', () => {
  it('should return all states', async () => {
    const res = await request(app).get('/api/states');
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
  });
});

describe('POST /api/states', () => {
  it('should create a new state entry', async () => {
    const newState = { name: 'Test State', capital: 'Testville' };
    const res = await request(app).post('/api/states').send(newState);
    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe('Test State');
  });
});
