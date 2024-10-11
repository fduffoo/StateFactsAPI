const express = require('express');
const router = express.Router();
const path = require('path');

// Serve the index.html file for root and /index.html routes
router.get('^/$|/index(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html'));
});

module.exports = router;