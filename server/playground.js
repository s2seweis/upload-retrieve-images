// app.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Video = require('./models/Video');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

mongoose.connect('mongodb://localhost:27017/videoApp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

app.use('/api/videos', require('./router'));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
