const express = require('express');
const router = express.Router();
const spotifyApi = require('../spotify');
const { analyzeSentiment } = require('../sentiment');

// Helper function to shuffle an array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

router.post('/generate', async (req, res) => {
  const { mood, text } = req.body;
  let detectedMood = mood;

  try {
    // Analyze sentiment only if text is provided and mood is not explicitly set
    if (!mood && text) {
      const sentimentResult = await analyzeSentiment(text);
      detectedMood = sentimentResult.label;  // Extract the label from the sentiment result
      console.log(`Detected mood: ${detectedMood}`);
    }

    // Fallback in case no mood was detected
    if (!detectedMood) {
      detectedMood = 'neutral';
    }

    detectedMood = detectedMood.trim().toLowerCase();
    console.log(`This one!! ${detectedMood}`);

    const genre = mapMoodToGenre(detectedMood);
    console.log(`Mapped mood to genre: ${genre}`);

    const data = await spotifyApi.searchTracks(`genre:${genre}`, { limit: 50 });
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
    console.error('Error generating playlist:', error);
    res.status(500).send('Error generating playlist');
  }
});

function mapMoodToGenre(mood) {
  switch (mood.toLowerCase()) {
    case 'positive':
      return 'pop';
    case 'negative':
      return 'acoustic';
    case 'neutral':
      return 'indie';
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
