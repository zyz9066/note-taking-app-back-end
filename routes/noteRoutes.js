const express = require('express');
const methodOverride = require('method-override');

const noteController = require('../controllers/note.controller');

const router = express.Router();

router.param('id', noteController.checkID);

// Middleware to support PUT and DELETE methods from forms
router.use(methodOverride('_method'));

router.route('/')
  .get(noteController.getNotes)
  .post(noteController.checkBody, noteController.createNote);

router.route('/:id')
  .get(noteController.getNote)
  .put(noteController.replaceNote)
  .patch(noteController.updateNote)
  .delete(noteController.deleteNote);

module.exports = router;
