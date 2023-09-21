const express = require('express');
const fs = require('fs');
const mongoose = require('mongoose'); // Import Mongoose

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB using Mongoose
mongoose.connect('mongodb://localhost:27017/videos', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');

  app.post('/init-video', async (req, res) => {
    try {
      const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db);
      const videoUploadStream = bucket.openUploadStream('bigbuck');

      const videoReadStream = fs.createReadStream('./bigbuck.mp4');

      videoUploadStream.on('error', (error) => {
        console.error('Error uploading video:', error);
        res.status(500).json({ error: 'Error uploading video' });
      });

      videoUploadStream.on('finish', () => {
        console.log('Video upload completed');
        res.status(200).send('Done...');
      });

      videoReadStream.pipe(videoUploadStream);
    } catch (error) {
      console.error(error);
      res.status(500).json(error);
    }
  });

  
});
