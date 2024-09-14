const statesJSONData = require('../model/statesData.json');

const verifyState = () => {
    return (req, res, next) => {
        const stateCode = req.params.state?.toUpperCase();
        const stateExists = statesJSONData.some(state => state.code === stateCode);
        if (!stateExists) return res.status(400).json({ 'message': 'Invalid state abbreviation parameter' });
        req.code = stateCode;
        next();
    };
};

module.exports = verifyState;
