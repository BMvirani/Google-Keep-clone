const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  userId: {
    // type: mongoose.Schema.Types.ObjectId,
    type: String,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: false,
  },
  content: {
    type: String,
    required: false,
  },
  background: {
    type: String,
    required: true,
  },
  isPin: {
    type: Boolean,
    required: true,
  },
  isArchive: {
    type: Boolean,
    required: true,
  },
  isTrash: {
    type: Boolean,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Note = mongoose.model("Note", noteSchema);

module.exports = Note;
