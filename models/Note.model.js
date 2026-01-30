const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema(
  {
    userId: { 
      type: String,
      required: [true, 'User is required'],
      unique: true,
    },
    title: { 
      type: String,
      required: [true, 'Title is required']
    },
    content: {
      type: String,
      required: [true, 'Content is required']
    },
  },
  { timestamps: true }
);

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;
