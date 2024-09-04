const express = require('express');
const router = express.Router();
const spotifyApi = require('../app'); // Import the configured Spotify API from app.js

// POST /api/playlist/generate
router.post('/generate', async (req, res) => {
  const { mood } = req.body;

  try {
    // Replace with your logic for mapping mood to genre
    const genre = mapMoodToGenre(mood);

    const data = await spotifyApi.searchTracks(`genre:${genre}`, { limit: 10 });

    const tracks = data.body.tracks.items.map(track => ({
      name: track.name,
      artist: track.artists[0].name,
      url: track.external_urls.spotify
    }));

    res.json({ tracks });
  } catch (error) {
    console.error('Error generating playlist:', error);
    res.status(500).send('Error generating playlist');
  }
});

module.exports = router;

// Function to map mood to genre
function mapMoodToGenre(mood) {
  switch (mood.toLowerCase()) {
    case 'happy':
      return 'pop';
    case 'sad':
      return 'acoustic';
    case 'energetic':
      return 'rock';
    default:
      return 'pop';
  }
}
