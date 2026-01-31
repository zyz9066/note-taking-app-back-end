const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema(
  {
    user: { 
      type: String,
      required: [true, 'User is required']
    },
    title: { 
      type: String,
      required: [true, 'Title is required']
    },
    content: {
      type: String,
      required: [true, 'Content is required']
    }
  },
  { timestamps: true }
);

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;
