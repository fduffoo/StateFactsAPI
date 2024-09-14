const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for state information
const stateSchema = new Schema({
    code: {
        type: String,
        required: true,
        unique: true,  // Ensures each state code is unique
        trim: true     // Trims whitespace from the beginning and end of the state code
    },
    funfacts: {
        type: [String], // Array of strings for fun facts
        default: []    // Default to an empty array if no fun facts are provided
    }
});

// Create and export the State model using the schema
module.exports = mongoose.model('State', stateSchema);
