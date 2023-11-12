import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import './VideoPlayer.css';

function VideoPlayer({ videoUrl }) {
  return (
    <div className='video-container'>
      <h2>Video Player</h2>
      <video className='video-classic' src={videoUrl}></video>
    </div>
  );
}

VideoPlayer.propTypes = {
  videoUrl: PropTypes.string.isRequired, // Make sure 'videoUrl' is a required string
};

export default VideoPlayer;
