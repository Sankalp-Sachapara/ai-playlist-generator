const express = require('express');
const spotifyApi = require('./spotify'); // Import the Spotify API configuration
const playlistRoutes = require('./routes/playlist'); // Import the playlist route
const cors = require('cors');  // Import the cors package

const app = express();
app.use(cors())
app.use(express.json());

// Use the playlist routes
app.use('/api/playlist', playlistRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
