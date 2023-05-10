const State = require('../model/State');
const data = {
    states: require('../model/statesData.json'),
    setStates: function (data) { this.states = data }
}

const getAllStates = (req, res) => {
    res.json(data.states);
}

const createNewState = async (req, res) => {
    if (!req?.body?.code || !req?.body?.funfacts) {
        return res.status(400).json({ 'message': 'StateCode and funfacts are required' });
    }

    try {
        const result = await State.create({
            code: req.body.code,
            funfacts: req.body.funfacts
        });

        res.status(201).json(result);
    } catch (err) {
        console.error(err);
    }
}

const updateState = async (req, res) => {
    if (!req?.body?.code) {
        return res.status(400).json({ 'message': 'State code parameter is required.' });
    }

    const state = await State.findOne({ _code: req.body.code }).exec();
    if (!state) {
        return res.status(204).json({ 'message': 'No state matches ID ${req.body.code}.' });
    }
    if (req.body?.code) state.code = req.body.code;
    if (req.body?.funfacts) state.funfacts = req.body.funfacts;
    const result = await state.save();
    res.json(result);
}

const deleteState = async (req, res) => {
    if (!req?.body?.code) return res.status(400).json({ 'message': 'State ID required.' });

    const state = await State.findOne({ _code: req.body.code }).exec();
    if (!state) {
        return res.status(204).json({ 'message': 'No state matches ID ${req.body.code}.' });
    }
    const result = await state.deleteOne();
    res.json(result);
}

const getState = (req, res) => {
    console.log(data.states)
    console.log('Params: ', req.params.state)
    const state = data.states.find(st => st.code === (req.params.state.toUpperCase()));
    console.log('State: ', state)
    if (!state) {
      //return res.status(404).json({'message':'Invalid state abbreviation parameter'});
        return res.status(404).json({'message': 'Invalid state abbreviation parameter'});
    }
    res.json(state);
}

const getFunfact = (req, res) => {
    const state = data.states.find(st => st.code === (req.params.state.toUpperCase()));
    if (!state) {
        return res.status(404).json({ 'message': 'Invalid state abbreviation parameter' });
    }
    if (!funfacts) {
        return res.status(400).json({ 'message': 'State fun facts value required' });
    }
    res.json({
        "state": state.state,
        "funfacts": state.funfacts
    });
}

const getCapital = (req, res) => {
    const state = data.states.find(st => st.code === (req.params.state.toUpperCase()));
    if (!state) {
        return res.status(404).json({ 'message': 'Invalid state abbreviation parameter' });
    }
    res.json({
        "state": state.state,
        "capital": state.capital_city
    });
}

const getNickname = (req, res) => {
    const state = data.states.find(st => st.code === (req.params.state.toUpperCase()));
    if (!state) {
        return res.status(404).json({ 'message': 'Invalid state abbreviation parameter' });
    }
    res.json({
        "state": state.state,
        "nickname": state.nickname
    });
}

const getPopulation = (req, res) => {
    const state = data.states.find(st => st.code === (req.params.state.toUpperCase()));
    if (!state) {
        return res.status(404).json({ 'message': 'Invalid state abbreviation parameter' });
    }
    res.json({
        "state": state.state,
        "population": state.population
    });
}

const getAdmission = (req, res) => {
    const state = data.states.find(st => st.code === (req.params.state.toUpperCase()));
    if (!state) {
        return res.status(404).json({ 'message': 'Invalid state abbreviation parameter' });
    }
    res.json({
        "state": state.state,
        "admitted": state.admission_date
    });
}

module.exports = {
    getAllStates,
    createNewState,
    updateState,
    deleteState,
    getState,
    getFunfact,
    getCapital,
    getNickname,
    getPopulation,
    getAdmission
}