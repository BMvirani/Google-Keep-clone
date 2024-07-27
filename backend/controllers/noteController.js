const Note = require("../models/Note");

// Add a new note
exports.addNote = async (req, res) => {
  try {
    const { userId, title = "", content = "", background, isPin, isArchive, isTrash } =
      req.body;

    if (!userId ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newNote = new Note({
      userId,
      title,
      content,
      background,
      isPin,
      isArchive,
      isTrash,
    });

    await newNote.save();
    res.status(200).json(newNote);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error",error:error });
  }
};

// Get notes by userId
exports.getNotesByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    const notes = await Note.find({ userId });

    if (notes.length === 0) {
      return res.status(404).json({ message: "No notes found" });
    }

    res.status(200).json(notes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get notes by userId
exports.getNotesByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const { isPin, isArchive, isTrash } = req.query;

    // Build query object
    let query = { userId };

    if (isPin !== undefined) {
      query.isPin = isPin === "true"; // Convert to boolean
    }

    if (isArchive !== undefined) {
      query.isArchive = isArchive === "true"; // Convert to boolean
    }

    if (isTrash !== undefined) {
      query.isTrash = isTrash === "true"; // Convert to boolean
    }

    const notes = await Note.find(query);

    const resData = {
      content: notes,
    };

    if (notes.length === 0) {
      return res.status(200).json(resData);
    }

    res.status(200).json(resData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Edit a note
exports.editNote = async (req, res) => {
  try {
    const { noteId } = req.params;
    const { title, content, background, isPin, isArchive, isTrash } = req.body;

    const updatedNote = await Note.findByIdAndUpdate(
      noteId,
      { title, content, background, isPin, isArchive, isTrash },
      { new: true, runValidators: true }
    );

    if (!updatedNote) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json(updatedNote);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete a note
exports.deleteNote = async (req, res) => {
  try {
    const { noteId } = req.params;

    const deletedNote = await Note.findByIdAndDelete(noteId);

    if (!deletedNote) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
