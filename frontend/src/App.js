import React, { useState } from 'react';
import PlaylistForm from './components/PlaylistForm';
import TrackList from './components/TrackList';

const App = () => {
  const [tracks, setTracks] = useState([]);

  return (
    <div>
      <h1>AI Playlist Generator</h1>
      <PlaylistForm setTracks={setTracks} />
      <TrackList tracks={tracks} />
    </div>
  );
};

export default App;
