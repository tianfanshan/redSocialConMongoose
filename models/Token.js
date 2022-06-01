const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    token:{
        type:String
    }
},{timestamps:true});

const Token = mongoose.model('Token',UserSchema);

module.exports = Token;