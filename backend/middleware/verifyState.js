const statesJSONData = require('../models/statesData.json');

const verifyState = () => {
    return (req, res, next) => {
        const stateCode = req.params.state?.toUpperCase();
        const stateExists = statesJSONData.some(state => state.code === stateCode);
        if (!stateExists) return res.status(404).json({ 'message': 'State not found' });
        req.code = stateCode;
        next();
    };
};

module.exports = verifyState;
