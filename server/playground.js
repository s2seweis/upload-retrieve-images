const express = require('express');
const router = express.Router();
const fs = require('fs');
const mongoose = require('mongoose');
const Grid = require('gridfs-stream');

const db = require('./db'); // Import the separated database connection

const connection = mongoose.connection; // Access the Mongoose connection object

Grid.mongo = mongoose.mongo; // Set GridFS to use the correct MongoDB driver

// Initialize GridFS
const gfs = Grid(connection.db);

router.post('/init-video', function (req, res) {
  const videoWriteStream = gfs.createWriteStream({
    filename: 'bigbuck',
    mode: 'w',
    content_type: 'video/mp4',
  });

  const videoReadStream = fs.createReadStream('./bigbuck.mp4');

  videoReadStream.pipe(videoWriteStream);

  videoWriteStream.on('close', (file) => {
    res.status(200).send('Done...');
  });
});

module.exports = router;
