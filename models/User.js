const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    // activation_token:{
    //     type:String,
    //     default:function(){
    //         return randToken.generate(64);
    //     }
    // },
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique: true,
        required: true
    },
    password:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    role:{
        type:String
    }
},{timestamps:true});

const User = mongoose.model('User',UserSchema);

module.exports = User;