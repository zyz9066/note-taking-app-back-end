const express = require('express');
const { requiresAuth } = require('express-openid-connect');
const router = express.Router();
const profileController = require('../controllers/profile.controller');

// Get logged-in Auth0 user profile
router.get('/', requiresAuth(), profileController.getProfile);

module.exports = router;
