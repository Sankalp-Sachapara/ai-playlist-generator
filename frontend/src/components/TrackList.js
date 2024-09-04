import React from 'react';

const TrackList = ({ tracks }) => {
  return (
    <div>
      {tracks.length > 0 ? (
        <ul>
          {tracks.map((track, index) => (
            <li key={index}>
              <a href={track.url} target="_blank" rel="noopener noreferrer">
                {track.name} by {track.artist}
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p>No tracks found.</p>
      )}
    </div>
  );
};

export default TrackList;
