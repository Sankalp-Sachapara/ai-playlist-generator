import React from 'react';

const TrackList = ({ tracks }) => {
  return (
    <ul>
      {tracks.length > 0 ? (
        tracks.map((track, index) => (
          <li key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
            {track.albumImage && (
              <img
                src={track.albumImage}
                alt={`${track.name} album cover`}
                style={{ width: '50px', height: '50px', marginRight: '15px', borderRadius: '4px' }}
              />
            )}
            <a href={track.url} target="_blank" rel="noopener noreferrer" style={{ color: '#007bff', textDecoration: 'none' }}>
              {track.name} by {track.artist}
            </a>
          </li>
        ))
      ) : (
        <p>No tracks found.</p>
      )}
    </ul>
  );
};

export default TrackList;
