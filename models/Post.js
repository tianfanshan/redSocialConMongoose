const mongoose = require('mongoose');
const ObjectId = mongoose.SchemaTypes.ObjectId;

const UserSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    userName:{
        type:String,
        required:true
    },
    userId:{
        type:ObjectId,
        ref:'User'
    }
},{timestamps:true});

const Post = mongoose.model('Post',UserSchema);

module.exports = Post;