const Note = require('../models/Note.model');

exports.checkID = async (req, res, next, val) => {
  const userId = req.oidc.user.sub;
  const note = await Note.findOne({ _id: val, user: userId });
  if (!note) return res.status(404).json({
    status: 'fail',
    message: 'Invalid ID'
  });
  next();
};

exports.checkBody = (req, res, next) => {
    if (!req.body.title || !req.body.content) {
      return res.status(400).json({
        status: 'fail',
        message: 'Missing title or content'
      });
    }
  next();
};

exports.getNotes = async (req, res) => {
  try {
    const userId = req.oidc.user.sub;
    const notes = await Note.find({ user: userId });
    return res.status(200).json({ 
      status: 'success',
      data: { notes }
    });
  } catch (error) {
    return res.status(500).json({ 
      status: 'fail',
      message: error.message
    });
  }
};

exports.createNote = async (req, res) => {
  try {
    const userId = req.oidc.user.sub;
    const newNote = await new Note({ user: userId, title, content }).save();
    return res.status(201).json({
      status: 'success',
      data: { note: newNote }
    });
  } catch (error) {
    return res.status(500).json({
      status: 'fail',
      message: error.message
    });
  }
};

exports.getNote = async (req, res) => {
  try {
    const userId = req.oidc.user.sub;
    const note = await Note.findOne({ _id: req.params.id, user: userId });
    if (!note) return res.status(404).json({
      status: 'fail',
      message: 'Note not found'
    });
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
    const note = await Note.findOneAndUpdate(
      { _id: req.params.id, user: userId },
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
    await Note.deleteOne({ _id: req.params.id, user: userId });
    return res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (error) {
    return res.status(500).json({
      status: 'fail',
      message: error.message
    });
  }
};
