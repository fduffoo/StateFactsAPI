const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for state information
const stateSchema = new Schema({
    stateCode: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    funfacts: {
        type: [String],
        default: []
    }
});

// Create and export the State model using the schema
module.exports = mongoose.model('State', stateSchema);

