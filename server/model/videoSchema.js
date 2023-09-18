const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    imgpath:{
        type:String,
        // required:true
    }
  

});


// create model

const video = new mongoose.model("videos",userSchema);

module.exports = video;

