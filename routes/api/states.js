const express = require('express');
const router = express.Router();
const statesController = require('../../controllers/statesController');
const verifyState = require('../../middleware/verifyState');

// Route for getting all states with optional query parameters
router.route('/')
    .get(statesController.getAllStates); // Retrieves a list of all states

// Route for handling state-specific operations
router.route('/:state')
    .get(verifyState(), statesController.getOneState); // Retrieves detailed information about the specified state

// Routes for managing fun facts about a specific state
router.route('/:state/funfact')
    .get(verifyState(), statesController.getRandomFact)  // Retrieves a random fun fact about the specified state
    .post(verifyState(), statesController.addNewStateFacts)  // Adds new fun facts for the specified state
    .patch(verifyState(), statesController.updateStateFact)  // Updates a fun fact at a specific index
    .delete(verifyState(), statesController.deleteStateFact);  // Deletes a fun fact at a specific index

// Route for getting the capital of a specified state
router.route('/:state/capital')
    .get(verifyState(), statesController.getCapital); // Retrieves the state and its capital

// Route for getting the nickname of a specified state
router.route('/:state/nickname')
    .get(verifyState(), statesController.getNickName); // Retrieves the state and its nickname

// Route for getting the population of a specified state
router.route('/:state/population')
    .get(verifyState(), statesController.getPop); // Retrieves the state and its population

// Route for getting the admission date of a specified state
router.route('/:state/admission')
    .get(verifyState(), statesController.getAdmission); // Retrieves the state and the date it was admitted

// Route for getting detailed information about a specified state
router.route('/:state/details')
    .get(verifyState(), statesController.getStateDetails); // Retrieves detailed information about the specified state

module.exports = router;
