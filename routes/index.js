const express = require('express');
const AppController = require('../controllers/AppController');
const UsersController = require('../controllers/UsersController');

const router = express.Router();

// Define routes
router.get('/status', AppController.getStatus);
router.get('/stats', AppController.getStats);

// New route for creating a user
router.post('/users', UsersController.postNew);

module.exports = router;
