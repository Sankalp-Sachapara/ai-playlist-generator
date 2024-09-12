import React, { useState } from 'react';
import axios from 'axios';

const PlaylistForm = ({ setTracks }) => {
  const [text, setText] = useState('');
  const [mood, setMood] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/playlist/generate', { mood, text });
      setTracks(response.data.tracks);
    } catch (error) {
      console.error('Error generating playlist:', error);
    }
  };

  const handleMoodChange = (e) => {
    setMood(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px' }}>
      <label style={{ marginBottom: '10px' }}>
        Enter your mood description or select from the list:
      </label>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Describe how you're feeling"
        style={{ padding: '10px', fontSize: '16px', borderRadius: '4px', marginBottom: '10px', width: '300px', height: '60px' }}
      />
      <select value={mood} onChange={handleMoodChange} style={{ padding: '10px', fontSize: '16px', borderRadius: '4px', marginBottom: '10px', width: '320px' }}>
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
      <button type="submit" style={{ padding: '10px 15px', fontSize: '16px', backgroundColor: '#007bff', color: 'white', borderRadius: '4px', cursor: 'pointer' }}>
        Generate Playlist
      </button>
    </form>
  );
};

export default PlaylistForm;
