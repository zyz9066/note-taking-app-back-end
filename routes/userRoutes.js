const express = require('express');
const methodOverride = require('method-override');

const userController = require('../controllers/user.controller');

const router = express.Router();

// Middleware to support PUT and DELETE methods from forms
router.use(methodOverride('_method'));

router.route('/')
  .get(userController.getUsers)
  .post(userController.createUser);

router.route('/:id')
  .get(userController.getUser)
  .put(userController.updateUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
