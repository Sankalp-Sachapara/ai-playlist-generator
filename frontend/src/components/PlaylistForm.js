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

  const handleMoodChange = (e) => {
    setMood(e.target.value);
  };

  return (
    <form className="playlist-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="playlist-input"
        value={mood}
        onChange={handleMoodChange}
        placeholder="Enter your mood"
      />
      <select className="playlist-select" value={mood} onChange={handleMoodChange}>
        <option value="">Select a mood</option>
        <option value="happy">Happy</option>
        <option value="sad">Sad</option>
        <option value="energetic">Energetic</option>
        <option value="chill">Chill</option>
        <option value="romantic">Romantic</option>
        <option value="party">Party</option>
        <option value="focus">Focus</option>
        <option value="sleep">Sleep</option>
      </select>
      <button className="playlist-button" type="submit">
        Generate Playlist
      </button>
    </form>
  );
};

export default PlaylistForm;
