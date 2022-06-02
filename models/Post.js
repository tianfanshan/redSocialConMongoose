const mongoose = require('mongoose');
const ObjectId = mongoose.SchemaTypes.ObjectId;

const UserSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true,'Tienes que añadir un titulo para seguir']
    },
    userName:{
        type:String,
        required:[true,'Tu nombre para hacer el post']
    },
    userId:{
        type:ObjectId,
        ref:'User'
    }
},{timestamps:true});

const Post = mongoose.model('Post',UserSchema);

module.exports = Post;