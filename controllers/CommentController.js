const Comment = require('../models/Comment')
const Post = require('../models/Post')
const User = require('../models/User')

const CommentController = {
    async create(req,res){
        try {
            if(req.files){
                const images = req.files.map((elem)=> elem.filename)
                req.body.images = images
                }
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
            res.send('Volvemos en 11 minutos')
        }
    },
    async update(req,res){
        try {
            if(req.files){
                const images = req.files.map((elem)=> elem.filename)
                req.body.images = images
                }
            const comment = await Comment.findByIdAndUpdate(
                req.params._id,
                {...req.body,userId:req.user._id},
                {new:true})
            res.send({comment,message:"Comentario actualizado"})
        } catch (error) {
            console.error(error)
            res.status(404).send('Introduce un id de formato correcto')
        }
    },
    async getById(req,res){
        try {
            const comments = await Comment.findById(req.params._id)
            if(!comments){
                return res.send('No hemos encontrado el comentario')
            }
            const comment = await Comment.findById(req.params._id)
            res.send(comment)
        } catch (error) {
            console.error(error)
            res.status(404).send('Introduce un id de formato correcto')
        }
    },
    async delete(req,res){
        try {
            await Comment.findByIdAndDelete(req.params._id)
            res.send('Comentario eliminado')
        } catch (error) {
            console.error(error)
            res.status(404).send('Introduce un id de formato correcto')
        }
    },
    async like(req,res){
        try {
            const comments = await Comment.findById(req.params._id)
            if(!comments){
                return res.send('No hemos encontrado el comentario')
            }
            if(comments.likes.includes(req.user._id)){
                return res.send('Ya le has dado el like a este comentario')
            }
            const comment = await Comment.findByIdAndUpdate(
                req.params._id,
                {$push:{likes:req.user._id}},
                {new:true}
            )
            await User.findByIdAndUpdate(
                req.user._id,
                {$push:{commentsLikes:req.params._id}},
                {new:true}
            )
            res.send(comment)
        } catch (error) {
            console.error(error)
            res.status(404).send('Introduce un id de formato correcto')
        }
    },
    async likeDown(req,res){
        try {
            const comments = await Comment.findById(req.params._id)
            if(!comments){
                return res.send('No hemos encontrado el comentario')
            }
            const users = await User.findById(req.user._id)
            if(!users.commentsLikes.includes(req.params._id)){
                return res.send('No le has dado el like al comentario')
            }
            await Comment.findByIdAndUpdate(
                req.params._id,
                {$pull:{likes:req.user._id}},
                {new:true}
            )
            const user = await User.findByIdAndUpdate(
                req.user._id,
                {$pull:{commentsLikes:req.params._id}},
                {new:true}
            )
            res.send(user)
        } catch (error) {
            console.error(error)
            res.status(404).send('Introduce un id de formato correcto')
        }
    }
}

module.exports = CommentController;