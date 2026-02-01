const Note = require('../models/noteModel');

exports.getNotes = async (req, res) => {
  try {
    // const user = req.oidc.user.sub;
    const user = req.body.user;
    const notes = await Note.find({ user });

    res.status(200).json({ 
      status: 'success',
      results: notes.length,
      data: {
        notes
      }
    });
  } catch (err) {
    res.status(404).json({ 
      status: 'fail',
      message: err.message
    });
  }
};

exports.createNote = async (req, res) => {
  try {
    // const userID = req.oidc.user.sub;
    const user = req.body.user;
    const { title, content } = req.body;
    const newNote = await Note.create({ user, title, content });

    res.status(201).json({
      status: 'success',
      data: {
        note: newNote
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};

exports.getNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    return res.status(200).json({
      status: 'success',
      data: {
        note
      }
    });
  } catch (err) {
    return res.status(404).json({
      status: 'fail',
      message: err.message
    });
  }
};

exports.replaceNote = async (req, res) => {
  try {
    const userId = req.oidc.user.sub;
    const { title, content } = req.body;
    const note = await Note.findByIdAndReplace(
      req.params.id,
      { user: userId, title, content },
      { new: true, runValidators: true }
    );
    return res.status(200).json({
      status: 'success',
      data: { note }
    });
  } catch (error) {
    return res.status(500).json({
      status: 'fail',
      message: error.message
    });
  }
};

exports.updateNote = async (req, res) => {
  try {
    const userId = req.oidc.user.sub;
    const { title, content } = req.body;
    const note = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true, runValidators: true }
    );
    return res.status(200).json({
      status: 'success',
      data: { note }
    });
  } catch (error) {
    return res.status(500).json({
      status: 'fail',
      message: error.message
    });
  }
};

exports.deleteNote = async (req, res) => {
  try {
    const userId = req.oidc.user.sub;
    await Note.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      message: error.message
    });
  }
};
