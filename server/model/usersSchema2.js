const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    fname:{
        type:String,
        // required:true
    },
    imgpath:{
        type:String,
        // required:true
    },
    image:{
        type: String,
        
    },
    image2:{
        type: String,
        
    },
    date:{
        type: String
    },
    imageCollection: []
});


// create model

const users2 = new mongoose.model("users2",userSchema);

module.exports = users2;

