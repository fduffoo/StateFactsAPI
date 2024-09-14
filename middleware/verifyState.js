const statesJSONData = require('../model/statesData.json');

const verifyState = () => {
    return (req, res, next) => {
        // Convert the state abbreviation from URL param to uppercase
        const stateAbbr = req.params.state.toUpperCase();
        
        // Get a Set of state codes for quick lookup
        const stateCodes = new Set(statesJSONData.map(st => st.code));
        
        // Check if the provided state abbreviation is valid
        if (!stateCodes.has(stateAbbr)) {
            return res.status(400).json({ 
                message: `Invalid state abbreviation: ${stateAbbr}. Please provide a valid state code.` 
            });
        }
        
        // Attach the valid state code to the request object and proceed
        req.code = stateAbbr;
        next();
    };
};

module.exports = verifyState;
