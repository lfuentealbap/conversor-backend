const express = require('express');
const router = express.Router();
const conversionController = require('../controllers/conversion.controller');

router.post('/conversion', conversionController.guardarConversion);
router.get('/historial', conversionController.historialConversiones);

module.exports = router;