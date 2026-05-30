const express = require('express');
const TokenController = require('../controllers/tokenController');

const router = express.Router();

router.post('/generate', TokenController.generateToken);
router.post('/validate', TokenController.validateToken);
router.get('/meter/:meterNumber', TokenController.getTokensByMeter);

module.exports = router;
