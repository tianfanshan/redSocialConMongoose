const mongoose = require('mongoose');
const ObjectId = mongoose.SchemaTypes.ObjectId;

const PostSchema = new mongoose.Schema({
    body:{
        type:String,
        required:[true,'Tienes que añadir un titulo para seguir']
    },
    userName:{
        type:String,
        required:[true,'Tu nombre para hacer el post']
    },
    userId:{type:ObjectId,ref:'User'},
    // comments:[{
    //     type:ObjectId,
    //     ref:'Comment'
    // }],
    likes:[{type:ObjectId,ref:'User'}]
},{timestamps:true});

const Post = mongoose.model('Post',PostSchema);

module.exports = Post;