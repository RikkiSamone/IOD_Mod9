const express = require('express');
const router = express.Router();
const { getTrendingAnime } = require('../controllers/animeAPIController');

// Route to get trending anime
router.get('/trending/anime', getTrendingAnime);

module.exports = router;