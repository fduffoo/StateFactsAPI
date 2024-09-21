const request = require('supertest');
const app = require('../server'); // Adjust the path to your app file
const State = require('../model/State');
const statesJSONData = require('../model/statesData.json');

jest.mock('../model/State'); // Mocking the State model

describe('States API', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('GET /states', () => {
        it('should return all states', async () => {
            State.find.mockResolvedValue([]); // Mock empty MongoDB response

            const response = await request(app).get('/states');

            expect(response.status).toBe(200);
            expect(response.body).toEqual(statesJSONData);
        });

        it('should return only contiguous states when contig=true', async () => {
            const contigStates = statesJSONData.filter(state => state.code !== 'AK' && state.code !== 'HI');
            State.find.mockResolvedValue([]); // Mock empty MongoDB response

            const response = await request(app).get('/states?contig=true');

            expect(response.status).toBe(200);
            expect(response.body).toEqual(contigStates);
        });

        it('should return only non-contiguous states when contig=false', async () => {
            const nonContigStates = statesJSONData.filter(state => state.code === 'AK' || state.code === 'HI');
            State.find.mockResolvedValue([]); // Mock empty MongoDB response

            const response = await request(app).get('/states?contig=false');

            expect(response.status).toBe(200);
            expect(response.body).toEqual(nonContigStates);
        });
    });

    describe('GET /states/:state', () => {
        it('should return a specific state', async () => {
            const mockState = { code: 'FL', state: 'Florida', funfacts: [] };
            State.findOne.mockResolvedValue({ funfacts: [] }); // Mock MongoDB state response

            const response = await request(app).get('/states/FL');

            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockState);
        });

        it('should return 404 for an invalid state code', async () => {
            const response = await request(app).get('/states/INVALID');

            expect(response.status).toBe(404);
            expect(response.body.message).toBe('State not found');
        });
    });

    describe('POST /states/:state/funfact', () => {
        it('should add new fun facts to a state', async () => {
            const funfacts = ['New Fun Fact 1', 'New Fun Fact 2'];
            State.findOne.mockResolvedValue({ funfacts: [] });
            State.create.mockResolvedValue({ stateCode: 'FL', funfacts });

            const response = await request(app)
                .post('/states/FL/funfact')
                .send({ funfacts });

            expect(response.status).toBe(201);
            expect(response.body.funfacts).toEqual(funfacts);
        });

        it('should return 400 if funfacts is missing', async () => {
            const response = await request(app).post('/states/FL/funfact').send({});

            expect(response.status).toBe(400);
            expect(response.body.message).toBe('State fun facts value required');
        });
    });

    describe('GET /states/:state/funfact', () => {
        it('should return a random fun fact', async () => {
            const mockState = { code: 'FL', funfacts: ['Fun Fact 1', 'Fun Fact 2'] };
            State.findOne.mockResolvedValue(mockState);

            const response = await request(app).get('/states/FL/funfact');

            expect(response.status).toBe(200);
            expect(mockState.funfacts).toContain(response.body.funfact);
        });

        it('should return 404 if no fun facts are found', async () => {
            const mockState = { code: 'FL' };
            State.findOne.mockResolvedValue({ funfacts: [] });

            const response = await request(app).get('/states/FL/funfact');

            expect(response.status).toBe(404);
            expect(response.body.message).toBe('No Fun Facts found for Florida');
        });
    });

    // Continue adding tests for other endpoints (update, delete, get capital, etc.)...
    describe('GET /states/:state/capital', () => {
        it('should return the capital of a state', async () => {
            const mockState = { code: 'FL', capital_city: 'Tallahassee' };
            State.findOne.mockResolvedValue({});

            const response = await request(app).get('/states/FL/capital');

            expect(response.status).toBe(200);
            expect(response.body).toEqual({ state: 'Florida', capital: 'Tallahassee' });
        });
    });

    // Additional tests for nickname, population, admission, and details...

});

