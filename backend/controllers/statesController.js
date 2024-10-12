const State = require('../models/State');
const statesJSONData = require('../models/statesData.json');

// Helper function to find a state in the JSON data based on its code
const findStateInJSON = (code) => statesJSONData.find(state => state.code === code.toUpperCase());

// Get a list of all states, optionally filtered by contiguous or non-contiguous
const getAllStates = async (req, res) => {
    const { contig } = req.query;
    let statesList = [...statesJSONData];

    // Filter states based on the `contig` query parameter
    if (contig === 'true') {
        statesList = statesList.filter(state => state.code !== 'AK' && state.code !== 'HI');
    } else if (contig === 'false') {
        statesList = statesList.filter(state => state.code === 'AK' || state.code === 'HI');
    }

    try {
        const mongoStates = await State.find();
        statesList.forEach(state => {
            const stateExists = mongoStates.find(st => st.stateCode === state.code);
            if (stateExists) state.funfacts = [...stateExists.funfacts];
        });
        res.json(statesList);
    } catch (err) {
        res.status(500).json({ 'message': 'Error fetching states from MongoDB', error: err.message });
    }
};

// Get a specific state by its code
const getOneState = async (req, res) => {
    const code = req.params.state.toUpperCase();
    const state = findStateInJSON(code);
    if (!state) return res.status(404).json({ 'message': 'State not found' });

    try {
        const savedState = await State.findOne({ stateCode: code }).exec();
        if (savedState) state.funfacts = [...savedState.funfacts];
        res.json(state);
    } catch (err) {
        res.status(500).json({ 'message': 'Error fetching state from MongoDB', error: err.message });
    }
};

// Add new fun facts to a state
const addNewStateFacts = async (req, res) => {
    // Extract and uppercase the state code from the request parameters
    const code = req.params.state ? req.params.state.toUpperCase() : null;

    // Log the state code to ensure it's not null
    console.log('Received state code:', code);

    // Check if the state code is valid
    if (!code) return res.status(400).json({ 'message': 'State code is required' });

    // Extract fun facts from the request body
    const { funfacts } = req.body;
    if (!funfacts) return res.status(400).json({ 'message': 'State fun facts value required' });
    if (!Array.isArray(funfacts)) return res.status(400).json({ 'message': 'State fun facts must be an array' });

    try {
        // Try to find the state in the database
        const savedState = await State.findOne({ stateCode: code }).exec();
        if (savedState) {
            // If state exists, update fun facts
            savedState.funfacts = [...savedState.funfacts, ...funfacts];
            const result = await savedState.save();
            res.json(result);
        } else {
            // If state does not exist, create a new entry
            const result = await State.create({ stateCode: code, funfacts });
            res.status(201).json(result);
        }
    } catch (err) {
        // Handle errors
        res.status(500).json({ 'message': 'Error saving state facts', error: err.message });
    }
};

// Get a random fun fact about a state
const getRandomFact = async (req, res) => {
    const code = req.params.state.toUpperCase();
    const state = findStateInJSON(code);
    if (!state) return res.status(404).json({ 'message': 'State not found' });

    try {
        const savedState = await State.findOne({ stateCode: code }).exec();
        const funfacts = savedState?.funfacts ?? [];
        if (!funfacts.length) return res.status(404).json({ 'message': `No Fun Facts found for ${state.state}` });
        const randomFact = funfacts[Math.floor(Math.random() * funfacts.length)];
        res.json({ 'funfact': randomFact });
    } catch (err) {
        res.status(500).json({ 'message': 'Error fetching fun facts from MongoDB', error: err.message });
    }
};

// Update a specific fun fact for a state
const updateStateFact = async (req, res) => {
    const code = req.params.state.toUpperCase();
    let { index, funfact } = req.body;
    if (index == null) return res.status(400).json({ 'message': 'State fun fact index required' });
    index = index - 1;
    if (!funfact) return res.status(400).json({ 'message': 'State fun fact value required' });

    try {
        const savedState = await State.findOne({ stateCode: code }).exec();
        if (!savedState || !savedState.funfacts.length) return res.status(404).json({ 'message': `No Fun Facts found for ${code}` });
        if (!savedState.funfacts[index]) return res.status(404).json({ 'message': `No Fun Fact at index ${index} for ${code}` });

        savedState.funfacts[index] = funfact;
        const result = await savedState.save();
        res.json(result);
    } catch (err) {
        res.status(500).json({ 'message': 'Error updating state fact', error: err.message });
    }
};

// Delete a specific fun fact for a state
const deleteStateFact = async (req, res) => {
    const code = req.params.state.toUpperCase();
    let { index } = req.body;
    if (index == null) return res.status(400).json({ 'message': 'State fun fact index required' });
    index = index - 1;

    try {
        const savedState = await State.findOne({ stateCode: code }).exec();
        if (!savedState || !savedState.funfacts.length) return res.status(404).json({ 'message': `No Fun Facts found for ${code}` });
        if (!savedState.funfacts[index]) return res.status(404).json({ 'message': `No Fun Fact at index ${index} for ${code}` });

        savedState.funfacts = savedState.funfacts.filter((_, i) => i !== index);
        const result = await savedState.save();
        res.json(result);
    } catch (err) {
        res.status(500).json({ 'message': 'Error deleting state fact', error: err.message });
    }
};

// Get the capital of a state
const getCapital = (req, res) => {
    const code = req.params.state.toUpperCase();
    const state = findStateInJSON(code);
    if (!state) return res.status(404).json({ 'message': 'State not found' });

    const capital = state.capital_city;
    res.json({ 'state': state.state, 'capital': capital });
};

// Get the nickname of a state
const getNickName = (req, res) => {
    const code = req.params.state.toUpperCase();
    const state = findStateInJSON(code);
    if (!state) return res.status(404).json({ 'message': 'State not found' });

    const nickname = state.nickname;
    res.json({ 'state': state.state, 'nickname': nickname });
};

// Get the population of a state
const getPop = (req, res) => {
    const code = req.params.state.toUpperCase();
    const state = findStateInJSON(code);
    if (!state) return res.status(404).json({ 'message': 'State not found' });

    const population = state.population.toLocaleString();
    res.json({ 'state': state.state, 'population': population });
};

// Get the admission date of a state
const getAdmission = (req, res) => {
    const code = req.params.state.toUpperCase();
    const state = findStateInJSON(code);
    if (!state) return res.status(404).json({ 'message': 'State not found' });

    const admissionDate = state.admission_date;
    res.json({ 'state': state.state, 'admitted': admissionDate });
};

// Get detailed information about a state
const getStateDetails = (req, res) => {
    const code = req.params.state.toUpperCase();
    const state = findStateInJSON(code);
    if (!state) return res.status(404).json({ 'message': 'State not found' });

    const details = {
        state: state.state,
        capital: state.capital_city,
        nickname: state.nickname,
        population: state.population.toLocaleString(),
        admission_date: state.admission_date
    };
    res.json(details);
};

// Get the website of a state
const getStateWebsite = (req, res) => {
    const code = req.params.state.toUpperCase();
    const state = findStateInJSON(code);
    if (!state) return res.status(404).json({ 'message': 'State not found' });

    const website = state.website;
    res.json({ 'state': state.state, 'website': website });
};

// Get the state flag URL
const getStateFlag = (req, res) => {
    const code = req.params.state.toUpperCase();
    const state = findStateInJSON(code);
    if (!state) return res.status(404).json({ 'message': 'State not found' });

    const flagUrl = state.state_flag_url;
    res.json({ 'state': state.state, 'flag_url': flagUrl });
};

// Get social media links of a state
const getStateSocialMedia = (req, res) => {
    const code = req.params.state.toUpperCase();
    const state = findStateInJSON(code);
    if (!state) return res.status(404).json({ 'message': 'State not found' });

    const twitter = state.twitter_url;
    const facebook = state.facebook_url;
    res.json({
        'state': state.state,
        'social_media': {
            'twitter': twitter,
            'facebook': facebook
        }
    });
};


module.exports = {
    getAllStates,
    getOneState,
    getRandomFact,
    addNewStateFacts,
    updateStateFact,
    deleteStateFact,
    getCapital,
    getNickName,
    getPop,
    getAdmission,
    getStateDetails,
    getStateWebsite,    
    getStateFlag,       
    getStateSocialMedia,
    findStateInJSON  
};
