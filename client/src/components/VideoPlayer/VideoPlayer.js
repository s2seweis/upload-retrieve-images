import React from 'react';
import './VideoPlayer.css';

function VideoPlayer({ videoUrl }) {
  return (
    <div className='video-container'>
      <h2>Video Player</h2>
      <video className='video-classic' src={videoUrl}></video>
    </div>
  );
}

export default VideoPlayer;