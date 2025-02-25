const express = require('express');
const {
    handleGenerateNewShortURL,
    handleGetAnalytics,
    handleGetShortURL
} = require('../controllers/url-ctrl');
const router = express.Router();

router.post('/', handleGenerateNewShortURL)
router.get('/analytics/:shortID', handleGetAnalytics)
router.get('/:shortID', handleGetShortURL)

module.exports = router;