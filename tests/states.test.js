const request = require('supertest');
const app = require('../server'); 

describe('State Facts API', () => {
    it('should return all states', async () => {
      const res = await request(app).get('/api/v1/states');
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('states');
      expect(res.body.states.length).toBeGreaterThan(0);
    });
  
    it('should return a specific state by abbreviation', async () => {
      const res = await request(app).get('/api/v1/states/FL');
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('state', 'Florida');
    });
  
    it('should return 404 for a non-existent state', async () => {
      const res = await request(app).get('/api/v1/states/XX');
      expect(res.statusCode).toBe(404);
    });
  });
  