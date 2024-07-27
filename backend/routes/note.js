const express = require('express');
const router = express.Router();
const noteController = require('../controllers/noteController');

// Route to add a new note
router.post('/add', noteController.addNote);

// Route to get notes by userId
router.get('/:userId', noteController.getNotesByUserId);

// Route to edit a note
router.put('/edit/:noteId', noteController.editNote);

// Route to delete a note
router.delete('/delete/:noteId', noteController.deleteNote);

module.exports = router;
