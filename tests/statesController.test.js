const request = require('supertest');
const app = require('../server'); 
const State = require('../model/State');
const statesJSONData = require('../model/statesData.json');

jest.mock('../model/State'); // Mocking the State model

describe('States API', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    // Tests for GET /states
    describe('GET /states', () => {
        it('should return all states', async () => {
            State.find.mockResolvedValue([]); // Mock empty MongoDB response

            const response = await request(app).get('/states');

            expect(response.status).toBe(200);
            expect(response.body).toEqual(statesJSONData);
        });

        it('should return only contiguous states when contig=true', async () => {
            const contigStates = statesJSONData.filter(state => state.code !== 'AK' && state.code !== 'HI');

            const response = await request(app).get('/states?contig=true');

            expect(response.status).toBe(200);
            expect(response.body).toEqual(contigStates);
        });

        it('should return only non-contiguous states when contig=false', async () => {
            const nonContigStates = statesJSONData.filter(state => state.code === 'AK' || state.code === 'HI');

            const response = await request(app).get('/states?contig=false');

            expect(response.status).toBe(200);
            expect(response.body).toEqual(nonContigStates);
        });
    });

    // Tests for GET /states/:state
    describe('GET /states/:state', () => {
        it('should return a specific state', async () => {
            const mockState = { code: 'FL', state: 'Florida', funfacts: [] };
            State.findOne.mockResolvedValue(mockState); // Mock MongoDB state response

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

    // Tests for POST /states/:state/funfact
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

    // Tests for GET /states/:state/funfact
    describe('GET /states/:state/funfact', () => {
        it('should return a random fun fact', async () => {
            const mockState = { code: 'FL', funfacts: ['Fun Fact 1', 'Fun Fact 2'] };
            State.findOne.mockResolvedValue(mockState);

            const response = await request(app).get('/states/FL/funfact');

            expect(response.status).toBe(200);
            expect(mockState.funfacts).toContain(response.body.funfact);
        });

        it('should return 404 if no fun facts are found', async () => {
            State.findOne.mockResolvedValue({ funfacts: [] });

            const response = await request(app).get('/states/FL/funfact');

            expect(response.status).toBe(404);
            expect(response.body.message).toBe('No Fun Facts found for Florida');
        });
    });

    // Tests for GET /states/:state/capital
    describe('GET /states/:state/capital', () => {
        it('should return the capital of a state', async () => {
            const mockState = { code: 'FL', capital_city: 'Tallahassee' };
            State.findOne.mockResolvedValue(mockState);

            const response = await request(app).get('/states/FL/capital');

            expect(response.status).toBe(200);
            expect(response.body).toEqual({ state: 'Florida', capital: 'Tallahassee' });
        });
    });

});

    // Tests for GET /states/:state/nickname
    describe('GET /states/:state/nickname', () => {
        it('should return the nickname of a state', async () => {
            const mockState = { code: 'FL', nickname: 'The Sunshine State' };
            State.findOne.mockResolvedValue(mockState);

            const response = await request(app).get('/states/FL/nickname');

            expect(response.status).toBe(200);
            expect(response.body).toEqual({ state: 'Florida', nickname: 'The Sunshine State' });
        });

        it('should return 404 if no nickname is found', async () => {
            State.findOne.mockResolvedValue({}); // No nickname found

            const response = await request(app).get('/states/FL/nickname');

            expect(response.status).toBe(404);
            expect(response.body.message).toBe('Nickname not found for Florida');
        });
    });

    // Tests for GET /states/:state/population
    describe('GET /states/:state/population', () => {
        it('should return the population of a state', async () => {
            const mockState = { code: 'FL', population: 21538187 };
            State.findOne.mockResolvedValue(mockState);

            const response = await request(app).get('/states/FL/population');

            expect(response.status).toBe(200);
            expect(response.body).toEqual({ state: 'Florida', population: 21538187 });
        });

        it('should return 404 if no population data is found', async () => {
            State.findOne.mockResolvedValue({}); // No population data found

            const response = await request(app).get('/states/FL/population');

            expect(response.status).toBe(404);
            expect(response.body.message).toBe('Population data not found for Florida');
        });
    });

    // Tests for GET /states/:state/admission
    describe('GET /states/:state/admission', () => {
        it('should return the admission date of a state', async () => {
            const mockState = { code: 'FL', admission_date: '1845-03-03' };
            State.findOne.mockResolvedValue(mockState);

            const response = await request(app).get('/states/FL/admission');

            expect(response.status).toBe(200);
            expect(response.body).toEqual({ state: 'Florida', admission_date: '1845-03-03' });
        });

        it('should return 404 if no admission date is found', async () => {
            State.findOne.mockResolvedValue({}); // No admission date found

            const response = await request(app).get('/states/FL/admission');

            expect(response.status).toBe(404);
            expect(response.body.message).toBe('Admission date not found for Florida');
        });
    });

    // Tests for GET /states/:state/area
    describe('GET /states/:state/area', () => {
        it('should return the area of a state', async () => {
            const mockState = { code: 'FL', area: 65758 }; // in square miles
            State.findOne.mockResolvedValue(mockState);

            const response = await request(app).get('/states/FL/area');

            expect(response.status).toBe(200);
            expect(response.body).toEqual({ state: 'Florida', area: 65758 });
        });

        it('should return 404 if no area data is found', async () => {
            State.findOne.mockResolvedValue({}); // No area data found

            const response = await request(app).get('/states/FL/area');

            expect(response.status).toBe(404);
            expect(response.body.message).toBe('Area data not found for Florida');
        });
    });

    // Tests for GET /states/:state/governor
    describe('GET /states/:state/governor', () => {
        it('should return the governor of a state', async () => {
            const mockState = { code: 'FL', governor: 'Ron DeSantis' };
            State.findOne.mockResolvedValue(mockState);

            const response = await request(app).get('/states/FL/governor');

            expect(response.status).toBe(200);
            expect(response.body).toEqual({ state: 'Florida', governor: 'Ron DeSantis' });
        });

        it('should return 404 if no governor data is found', async () => {
            State.findOne.mockResolvedValue({}); // No governor data found

            const response = await request(app).get('/states/FL/governor');

            expect(response.status).toBe(404);
            expect(response.body.message).toBe('Governor data not found for Florida');
        });
    });

    // Tests for DELETE /states/:state/funfact/:funfactId
    describe('DELETE /states/:state/funfact/:funfactId', () => {
        it('should delete a fun fact from a state', async () => {
            const funfactId = '12345'; // Example fun fact ID
            State.findOne.mockResolvedValue({ funfacts: ['Old Fun Fact 1', 'Old Fun Fact 2'] });
            State.updateOne.mockResolvedValue({ modifiedCount: 1 });

            const response = await request(app).delete(`/states/FL/funfact/${funfactId}`);

            expect(response.status).toBe(200);
            expect(response.body.message).toBe('Fun fact deleted successfully');
        });

        it('should return 404 if the fun fact does not exist', async () => {
            const funfactId = 'invalid-id';
            State.findOne.mockResolvedValue({ funfacts: [] }); // No fun facts found

            const response = await request(app).delete(`/states/FL/funfact/${funfactId}`);

            expect(response.status).toBe(404);
            expect(response.body.message).toBe('Fun fact not found');
        });
    });

    // Tests for GET /states/:state/facts
    describe('GET /states/:state/facts', () => {
        it('should return all fun facts for a state', async () => {
            const mockState = { code: 'FL', funfacts: ['Fun Fact 1', 'Fun Fact 2'] };
            State.findOne.mockResolvedValue(mockState);

            const response = await request(app).get('/states/FL/facts');

            expect(response.status).toBe(200);
            expect(response.body.funfacts).toEqual(mockState.fanfacts);
        });

        it('should return 404 if no fun facts are found', async () => {
            State.findOne.mockResolvedValue({ funfacts: [] }); // No fun facts found

            const response = await request(app).get('/states/FL/facts');

            expect(response.status).toBe(404);
            expect(response.body.message).toBe('No fun facts found for Florida');
        });
    });

