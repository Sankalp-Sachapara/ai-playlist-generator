import React, { useState } from 'react';
import PlaylistForm from './components/PlaylistForm';
import TrackList from './components/TrackList';
import './index.css'; // Import the CSS file

const App = () => {
  const [tracks, setTracks] = useState([]);

  return (
    <>
      <div className="overlay"></div>
      <div className="container">
        <h1>AI Playlist Generator</h1>
        <PlaylistForm setTracks={setTracks} />
        <TrackList tracks={tracks} />
      </div>
    </>
  );
};

export default App;
