const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require("validator");

const userSchema = new Schema({

    name :{
         type: String
    },
    age :
    {
       type: Number
    },
    pNO : {
        type: Number
    },
    email :{
        type: String
    },
    password: {
     type: String
    }
    
})

const User = mongoose.model('User',userSchema);
module.exports = User;
