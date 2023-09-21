const mongoose = require('mongoose');

// Define the video schema
const videoSchema = new mongoose.Schema({
//   filename: String,       // The original filename of the video
//   contentType: String,    // The content type (e.g., video/mp4)
  folder: String,         // The folder where the video is stored
  uploadDate: {           // The date the video was uploaded
    type: Date,
    default: Date.now,
  },
  // Add any other fields you want to store with your video documents
});

// Create a Mongoose model for the video schema
const Video = mongoose.model('Video', videoSchema);

module.exports = Video;