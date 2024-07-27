const mongoose = require("mongoose");

const notePositionSchema = new mongoose.Schema({
  userId: {
    type: "string",
    ref: "User",
    required: true,
  },
  listType: {
    type: String,
    enum: ["pin", "archive", "trash","note"], // Adjust list types as needed
    required: true,
  },

  position: {
    type: String,
    required: true,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const NotePosition = mongoose.model("NotePosition", notePositionSchema);

module.exports = NotePosition;
