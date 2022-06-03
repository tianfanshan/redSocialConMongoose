const Comment = require('../models/Comment')
const Post = require('../models/Post')

const CommentController = {
    async create(req,res){
        try {
            const comment = await Comment.create({
                ...req.body,
                userId:req.user._id,
                postId:req.body.postId
            })
            await Post.findByIdAndUpdate(
                req.body.postId,
                {$push:{commentIds:comment._id}},
                {new:true}
            )
            res.status(201).send({message:'Comentario creado',comment})
        } catch (error) {
            console.error(error)
        }
    },
}

module.exports = CommentController;