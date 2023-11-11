import React from 'react';

function VideoPlayer({ videoUrl }) {
  return (
    <div>
      <h2>Video Player</h2>
      <video controls width="400" src={videoUrl}></video>
    </div>
  );
}

export default VideoPlayer;