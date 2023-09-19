// gridfs.js

const { GridFSBucket } = require('mongodb');
const conn = require('../server/db/conn');

let gfs;

// Initialize GridFS bucket once the connection is open
function initGFS() {
  if (!gfs) {
    gfs = new GridFSBucket(conn.db, {
      bucketName: 'videos', // Replace with your preferred bucket name
    });
  }
}

// Function to get the GridFS bucket
function getGFS() {
  initGFS();
  return gfs;
}

module.exports = getGFS;
