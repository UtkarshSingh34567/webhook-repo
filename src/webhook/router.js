const express = require('express');
const controller = require('./controller');
const router = express.Router();

router.post('/webhook', controller.handleGitHubWebhook);

module.exports = router;
