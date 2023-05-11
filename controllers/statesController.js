const { id } = require('date-fns/locale');
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

const getState = async (req, res) => {
    const state = data.states.find(st => st.code === (req.params.state.toUpperCase()));
    if (!state) {
      return res.status(404).json({ 'message': 'Invalid state abbreviation parameter' });
    }
    res.json(state);
}

const createFunfact = async (req, res) => {
    if (!req?.params?.state){ 
        return res.status(400).json({'message': 'Invalid state abbreviation parameter'});
    }
    if(!req?.body?.funfacts){
        return res.status(400).json({"message": "State fun facts value required"});
    }
    if(!Array.isArray(req.body.funfacts)) {
        return res.status(400).json({'message': "State fun facts value must be an array"});
    }
    const code = req.params.state.toUpperCase();
    if(!await State.findOneAndUpdate({code: code},{$push: {"funfacts": req.body.funfacts}})){
            await State.create({ 
                code: code,
                funfacts: req.body.funfacts
             });
        }
    const result = await State.findOne({code: code}).exec();
    res.status(201).json(result);
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
        "population": state.population.toLocaleString()
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

const deleteFunfact = async (req, res) => {
    const state = await data.states.findOne(st => st.code === (req.params.state.toUpperCase()));
    if (!state) {
        return res.status(404).json({ 'message': 'Invalid state abbreviation parameter' });
    }
        else if (!state.funfacts.length) {
            res.json({ 'message': 'No Fun Facts found for ' + jsonState.state })
        }
        else if (req.body.index <= 0 || req.body.index > state.funfacts.length) {
            res.json({ 'message': 'No Fun Fact found at that index for ' + jsonState.state })
        }
        const toEdit = state.funfacts;
        toEdit.splice(req.body.index - 1, 1);
        state.funfacts = toEdit;
        state.save();
}

module.exports = {
    getAllStates,
    createNewState,
    updateState,
    deleteState,
    getState,
    createFunfact,
    getCapital,
    getNickname,
    getPopulation,
    getAdmission,
    deleteFunfact
}