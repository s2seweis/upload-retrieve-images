// const mongoose = require("mongoose");

// const DB = process.env.DATABASE

// // mongoose.connect(DB,{
// mongoose.connect('mongodb+srv://weissenborn24seb:BMHxCDtYBSAYChJK@sw-mangodb.hltjnmb.mongodb.net/auth-protected-routes',{
//     useUnifiedTopology: true,
//     useNewUrlParser: true
// }).then(()=>console.log("DATABASE connected")).catch((err)=> console.log("error" + err.message))

// conn.js



// #################################################

// const mongoose = require('mongoose');
// const uri = 'mongodb+srv://weissenborn24seb:BMHxCDtYBSAYChJK@sw-mangodb.hltjnmb.mongodb.net/auth-protected-routes'; // Replace with your MongoDB URI

// mongoose.connect(uri, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// const connection = mongoose.connection;

// connection.once('open', () => {
//   console.log('MongoDB database connection established successfully');
// });


// module.exports = connection;

// #################################################
// working almost!!!
// const mongoose1 = require('mongoose');

// const dbURL = 'mongodb+srv://weissenborn24seb:BMHxCDtYBSAYChJK@sw-mangodb.hltjnmb.mongodb.net/auth-protected-routes';

// mongoose1.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true });

// const db = mongoose1.connection;

// db.on('error', (error) => {
//   console.error('MongoDB connection error:', error);
// });

// db.once('open', () => {
//   console.log('Connected to MongoDB');
// });

// module.exports = {
//   mongoose1,
// };

// ### also working almost:2

// const mongoose1 = require('mongoose');
// const Grid = require('gridfs-stream');
// const { MONGO_URI } = process.env; // Replace with your MongoDB URI

// mongoose1.connect(MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// const conn = mongoose1.connection;
// let gfs;

// conn.once('open', () => {
//   gfs = Grid(conn.db, mongoose1.mongo);
//   gfs.collection('uploads');
// });

// module.exports = { mongoose1, gfs };

// ### working but store BinData

// const mongoose1 = require('mongoose');
// const Grid = require('gridfs-stream');

// const dbURL = 'mongodb+srv://weissenborn24seb:BMHxCDtYBSAYChJK@sw-mangodb.hltjnmb.mongodb.net/auth-protected-routes'; // Update with your MongoDB URL

// mongoose1.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true });

// const conn = mongoose1.connection;
// let gfs;

// conn.once('open', () => {
//   gfs = Grid(conn.db, mongoose1.mongo);
//   gfs.collection('uploads');
// });

// module.exports = { mongoose1, gfs };


// ###

const mongoose = require('mongoose');

const mongoURI = 'mongodb+srv://weissenborn24seb:BMHxCDtYBSAYChJK@sw-mangodb.hltjnmb.mongodb.net/files'; // Replace with your MongoDB URI
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });



const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

module.exports = mongoose;




















