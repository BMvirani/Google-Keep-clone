const express = require('express');
const router = express.Router();
const notePositionController = require('../controllers/notePosition');

// Route to store or update note positions
router.post('/store', notePositionController.storePositions);

// Route to get note positions by userId and listType
router.get('/:userId/:listType', notePositionController.getPositions);

module.exports = router;
