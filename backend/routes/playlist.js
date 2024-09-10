const express = require('express');
const router = express.Router();
const spotifyApi = require('../spotify'); // Import the configured Spotify API

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// POST /api/playlist/generate
router.post('/generate', async (req, res) => {
  const { mood } = req.body;
  console.log("Received mood:", mood);

  try {
    const genre = mapMoodToGenre(mood);
    console.log("Mapped mood to genre:", genre);

    const data = await spotifyApi.searchTracks(`genre:${genre}`, { limit: 50 }); // Increase the limit to get more tracks
    let tracks = data.body.tracks.items;

    // Shuffle the tracks array
    shuffleArray(tracks);

    // Select the first 10 tracks from the shuffled array
    tracks = tracks.slice(0, 10).map(track => ({
      name: track.name,
      artist: track.artists[0].name,
      albumImage: track.album.images[0]?.url,
      url: track.external_urls.spotify
    }));

    res.json({ tracks });
  } catch (error) {
    console.error('Error generating playlist:', error.message);
    res.status(500).send('Error generating playlist');
  }
});


function mapMoodToGenre(mood) {
  switch (mood.toLowerCase()) {
    case 'happy':
      return 'pop';
    case 'sad':
      return 'acoustic';
    case 'energetic':
      return 'rock';
    case 'chill':
      return 'indie';
    case 'romantic':
      return 'romance';
    case 'party':
      return 'dance';
    case 'focus':
      return 'electronic';
    default:
      return 'pop';
  }
}  

module.exports = router;
