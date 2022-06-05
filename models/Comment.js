const mongoose = require('mongoose');
const ObjectId = mongoose.SchemaTypes.ObjectId;

const CommentSchema = new mongoose.Schema({
    comment:String,
    likes:[{type:ObjectId,ref:'User'}],
    userId:{type:ObjectId,ref:'User'},
    postId:{type:ObjectId,ref:'Post'},
},{timestamps:true});

const Comment = mongoose.model('Comment',CommentSchema);

module.exports = Comment;