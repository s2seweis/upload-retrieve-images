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
    }
});


// create model

const users1 = new mongoose.model("users1",userSchema);

module.exports = users1;

