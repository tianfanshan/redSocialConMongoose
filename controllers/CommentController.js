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
    async update(req,res){
        try {
            const comment = await Comment.findByIdAndUpdate(
                req.params._id,
                {...req.body,userId:req.user._id},
                {new:true})
            res.send({comment,message:"Comentario actualizado"})
        } catch (error) {
            console.error(error)
            res.send('Vuelve a intentar dentro de 8 minutos')
        }
    },
    async delete(req,res){
        try {
            await Comment.findByIdAndDelete(req.params._id)
            res.send('Comentario eliminado')
        } catch (error) {
            console.error(error)
            res.send('Vuelve a intentar dentro de 9 minutos')
        }
    },
}

module.exports = CommentController;