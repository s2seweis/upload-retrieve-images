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


// const mongoose = require('mongoose');

// const url = 'mongodb+srv://weissenborn24seb:BMHxCDtYBSAYChJK@sw-mangodb.hltjnmb.mongodb.net/auth-protected-routes'; // Replace with your MongoDB connection URL

// mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => {
//     console.log('Connected to MongoDB');
//   })
//   .catch((error) => {
//     console.error('Error connecting to MongoDB:', error);
//   });

// module.exports = mongoose.connection;



// ############################

// const mongoose = require('mongoose');

// const mongoURI = 'mongodb+srv://weissenborn24seb:BMHxCDtYBSAYChJK@sw-mangodb.hltjnmb.mongodb.net/auth-protected-routes'; // Replace with your MongoDB connection URL

// mongoose.connect(mongoURI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// const db = mongoose.connection;

// db.on('error', (error) => {
//   console.error('MongoDB connection error:', error);
// });

// db.once('open', () => {
//   console.log('Connected to MongoDB');
// });

// module.exports = db;

// ####

const mongoose = require('mongoose');

const mongoURI = 'mongodb+srv://weissenborn24seb:BMHxCDtYBSAYChJK@sw-mangodb.hltjnmb.mongodb.net/auth-protected-routes'; // Replace with your MongoDB connection URL

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

db.once('open', () => {
  console.log('Connected to MongoDB');
});

module.exports = db;


// ###########################


// const mongodb = require('mongodb');

// const mongoURI = 'mongodb+srv://weissenborn24seb:BMHxCDtYBSAYChJK@sw-mangodb.hltjnmb.mongodb.net/auth-protected-routes'; // Replace with your MongoDB connection URL

// mongodb.MongoClient.connect(mongoURI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// }, (error, client) => {
//   if (error) {
//     console.error('Failed to connect to MongoDB:', error);
//     process.exit(1); // Exit the application on connection error
//   }

//   const db = client.db('videos');
//   console.log('Connected to MongoDB');

//   module.exports = db; // Export the database connection
// });

// ####


// const mongodb = require('mongodb');

// const mongoURI = 'mongodb+srv://weissenborn24seb:BMHxCDtYBSAYChJK@sw-mangodb.hltjnmb.mongodb.net/auth-protected-routes'; // Replace with your MongoDB connection URL

// mongodb.MongoClient.connect(mongoURI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// }, (error, client) => {
//   if (error) {
//     console.error('Failed to connect to MongoDB:', error);
//     process.exit(1); // Exit the application on connection error
//   }

//   const db = client.db('videos');
//   console.log('Connected to MongoDB');

//   module.exports = db; // Export the database connection
// });


