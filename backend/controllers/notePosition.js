const NotePosition = require('../models/notePosition');

// Store or update note positions
exports.storePositions = async (req, res) => {
  try {
    const { userId, listType, position } = req.body;

    if (!userId || !listType || !position) {
      return res.status(400).json({ message: 'Missing required fields or invalid data' });
    }

    // Find or create note position document
    let notePosition = await NotePosition.findOne({ userId, listType });

    if (notePosition) {
      // Update existing document
      notePosition.position = position;
      notePosition.updatedAt = Date.now();
    } else {
      // Create new document
      notePosition = new NotePosition({ userId, listType, position });
    }

    await notePosition.save();
    res.status(200).json(notePosition);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error'});
  }
};

// Get note positions by userId and listType
exports.getPositions = async (req, res) => {
  try {
    const { userId, listType } = req.params;

    const notePosition = await NotePosition.findOne({ userId, listType });

    if (!notePosition) {
      return res.status(200).json([]);
    }

    res.status(200).json(notePosition);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
