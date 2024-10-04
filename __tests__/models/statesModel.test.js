const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const State = require('../model/State');

let mongoServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

afterEach(async () => {
    await State.deleteMany(); // Clear the database after each test
});

describe('State model', () => {

    it('should create and save a state successfully', async () => {
        const validState = new State({ stateCode: 'CA', funfacts: ['It\'s sunny here', 'Hollywood is famous'] });
        const savedState = await validState.save();

        expect(savedState._id).toBeDefined();
        expect(savedState.stateCode).toBe('CA');
        expect(savedState.funfacts).toEqual(['It\'s sunny here', 'Hollywood is famous']);
    });

    it('should not create a state without the stateCode field', async () => {
        const stateWithoutCode = new State({ funfacts: ['Fact about unknown state'] });
        let err;
        try {
            await stateWithoutCode.save();
        } catch (error) {
            err = error;
        }
        expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
        expect(err.errors.stateCode).toBeDefined();
    });

    it('should trim and save stateCode properly', async () => {
        const stateWithWhitespace = new State({ stateCode: '  TX  ', funfacts: ['BBQ is great'] });
        const savedState = await stateWithWhitespace.save();

        expect(savedState.stateCode).toBe('TX'); // Should be trimmed
    });

    it('should enforce unique stateCode', async () => {
        const state1 = new State({ stateCode: 'NY', funfacts: ['The Big Apple'] });
        const state2 = new State({ stateCode: 'NY', funfacts: ['Duplicate entry'] });
        await state1.save();
        
        let err;
        try {
            await state2.save();
        } catch (error) {
            err = error;
        }
        expect(err).toBeDefined();
        expect(err.code).toBe(11000); // MongoDB duplicate key error code
    });

    it('should use an empty array as the default value for funfacts', async () => {
        const state = new State({ stateCode: 'FL' });
        const savedState = await state.save();

        expect(savedState.funfacts).toEqual([]); // Default empty array
    });
});
