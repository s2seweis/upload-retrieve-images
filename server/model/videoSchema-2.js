const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  folder: String,         // The folder where the video is stored
  uploadDate: {           // The date the video was uploaded
    type: Date,
    default: Date.now,
  },
});
const video2 = mongoose.model('videos2', videoSchema);

module.exports = video2;