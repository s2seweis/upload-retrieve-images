// const mongoose = require("mongoose");

// const DB = process.env.DATABASE

// // mongoose.connect(DB,{
// mongoose.connect('mongodb+srv://weissenborn24seb:BMHxCDtYBSAYChJK@sw-mangodb.hltjnmb.mongodb.net/auth-protected-routes',{
//     useUnifiedTopology: true,
//     useNewUrlParser: true
// }).then(()=>console.log("DATABASE connected")).catch((err)=> console.log("error" + err.message))

// conn.js

const mongoose = require('mongoose');
const uri = 'mongodb+srv://weissenborn24seb:BMHxCDtYBSAYChJK@sw-mangodb.hltjnmb.mongodb.net/auth-protected-routes'; // Replace with your MongoDB URI

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;

connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

module.exports = connection;