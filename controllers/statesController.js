const State = require('../model/State');
const statesJSONData = require('../model/statesData.json');

// Helper function to find state in JSON data
const findStateInJSON = (code) => statesJSONData.find(state => state.code === code);

const getAllStates = async (req, res) => {
    const { contig } = req.query;
    let statesList = [...statesJSONData];
    
    // Filter states based on `contig` query parameter
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
}

const getOneState = async (req, res) => {
    const code = req.code;
    const state = findStateInJSON(code);
    if (!state) return res.status(404).json({ 'message': 'State not found' });

    try {
        const savedState = await State.findOne({ stateCode: code }).exec();
        if (savedState) state.funfacts = [...savedState.funfacts];
        res.json(state);
    } catch (err) {
        res.status(500).json({ 'message': 'Error fetching state from MongoDB', error: err.message });
    }
}

const getRandomFact = async (req, res) => {
    const code = req.code;
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
}

const addNewStateFacts = async (req, res) => {
    const code = req.code;
    const { funfacts } = req.body;
    if (!funfacts) return res.status(400).json({ 'message': 'State fun facts value required' });
    if (!Array.isArray(funfacts)) return res.status(400).json({ 'message': 'State fun facts must be an array' });

    try {
        const savedState = await State.findOne({ stateCode: code }).exec();
        if (savedState) {
            savedState.funfacts = [...savedState.funfacts, ...funfacts];
            const result = await savedState.save();
            res.json(result);
        } else {
            const result = await State.create({ stateCode: code, funfacts });
            res.status(201).json(result);
        }
    } catch (err) {
        res.status(500).json({ 'message': 'Error saving state facts', error: err.message });
    }
}

const updateStateFact = async (req, res) => {
    const code = req.code;
    let { index, funfact } = req.body;
    if (index == null) return res.status(400).json({ 'message': 'State fun fact index required' });
    index = index - 1; // adjust for 0 index
    if (!funfact) return res.status(400).json({ 'message': 'State fun fact value required' });

    const state = findStateInJSON(code);
    if (!state) return res.status(404).json({ 'message': 'State not found' });

    try {
        const savedState = await State.findOne({ stateCode: code }).exec();
        const funfacts = savedState?.funfacts ?? [];
        if (!funfacts.length) return res.status(404).json({ 'message': `No Fun Facts found for ${state.state}` });
        if (!funfacts[index]) return res.status(404).json({ 'message': `No Fun Fact at index ${index} for ${state.state}` });
        
        funfacts[index] = funfact;
        savedState.funfacts = funfacts;
        const result = await savedState.save();
        res.json(result);
    } catch (err) {
        res.status(500).json({ 'message': 'Error updating state fact', error: err.message });
    }
}

const deleteStateFact = async (req, res) => {
    const code = req.code;
    let { index } = req.body;
    if (index == null) return res.status(400).json({ 'message': 'State fun fact index required' });
    index = index - 1; // adjust for 0 index

    const state = findStateInJSON(code);
    if (!state) return res.status(404).json({ 'message': 'State not found' });

    try {
        const savedState = await State.findOne({ stateCode: code }).exec();
        const funfacts = savedState?.funfacts ?? [];
        if (!funfacts.length) return res.status(404).json({ 'message': `No Fun Facts found for ${state.state}` });
        if (!funfacts[index]) return res.status(404).json({ 'message': `No Fun Fact at index ${index} for ${state.state}` });
        
        savedState.funfacts = funfacts.filter((_, i) => i !== index);
        const result = await savedState.save();
        res.json(result);
    } catch (err) {
        res.status(500).json({ 'message': 'Error deleting state fact', error: err.message });
    }
}

const getCapital = (req, res) => {
    const code = req.code;
    const state = findStateInJSON(code);
    if (!state) return res.status(404).json({ 'message': 'State not found' });
    res.json({ 'state': state.state, 'capital': state.capital_city });
}

const getNickName = (req, res) => {
    const code = req.code;
    const state = findStateInJSON(code);
    if (!state) return res.status(404).json({ 'message': 'State not found' });
    res.json({ 'state': state.state, 'nickname': state.nickname });
}

const getPop = (req, res) => {
    const code = req.code;
    const state = findStateInJSON(code);
    if (!state) return res.status(404).json({ 'message': 'State not found' });
    res.json({ 'state': state.state, 'population': state.population.toLocaleString('en-US') });
}

const getAdmission = (req, res) => {
    const code = req.code;
    const state = findStateInJSON(code);
    if (!state) return res.status(404).json({ 'message': 'State not found' });
    res.json({ 'state': state.state, 'admitted': state.admission_date });
}

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
    getAdmission
}
