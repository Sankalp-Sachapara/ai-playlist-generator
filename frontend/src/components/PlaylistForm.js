import React, { useState } from 'react';
import axios from 'axios';

const PlaylistForm = ({ setTracks }) => {
  const [mood, setMood] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/playlist/generate', { mood });
      setTracks(response.data.tracks);
    } catch (error) {
      console.error('Error generating playlist:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Enter your mood:
        <input
          type="text"
          value={mood}
          onChange={(e) => setMood(e.target.value)}
          placeholder="e.g., happy, sad, energetic"
        />
      </label>
      <button type="submit">Generate Playlist</button>
    </form>
  );
};

export default PlaylistForm;
