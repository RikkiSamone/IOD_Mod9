const axios = require('axios');

// Fetch trending anime from the Kitsu API
exports.getTrendingAnime = async (req, res) => {
  try {
    const response = await axios.get('https://kitsu.io/api/edge/trending/anime');
    const trendingAnime = response.data.data;

    // Optionally, you can process or save the data here if needed
    res.status(200).json(trendingAnime);
  } catch (error) {
    console.error('Error fetching trending anime:', error);
    res.status(500).json({ message: 'Error fetching trending anime', error: error.message });
  }
};