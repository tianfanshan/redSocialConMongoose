const mongoose = require('mongoose');
const ObjectId = mongoose.SchemaTypes.ObjectId;

const UserSchema = new mongoose.Schema({
    title:{
        type:String
    },
    userName:{
        type:String
    },
    userId:{
        type:ObjectId,
        ref:'User'
    }
},{timestamps:true});

const Post = mongoose.model('Post',UserSchema);

module.exports = Post;