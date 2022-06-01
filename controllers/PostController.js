const Post = require('../models/Post')

const PostController ={
    async create(req,res){
        try {
            const post = await Post.create({
                ...req.body,
                daliveryDate:new Date(),
                userId:req.user._id
            })
            res.status(201).send(post)
        } catch (error) {
            console.error(error)
            res.status(500).send({message:"Ha habido parado un problema al crear post"})
        }
    },
    async update(req,res){
        try {
            const post = await Post.findByIdAndUpdate(
                req.params._id,
                {...req.body,userId:req.user._id},
                {new:true}
            );
            res.send({message:"Post actualizado con éxito",post});
        } catch (error) {
            console.error(error)
        }
    },
    async delete(req,res){
        try {
            const post = await Post.findById(req.user._id)
            res.send({message:"Post eliminado con éxito"})
        } catch (error) {
            console.error(error)
        }
    },
    async getPostById(req,res){
        try {
            const post = await Post.findById(req.params._id)
            res.status(200).send(post)
        } catch (error) {
            console.error(error)
        }
    },
    async getPostByTitle(req,res){
        try {
            if(req.params.title.length > 20){
                return res.status(400).send('Busqueda demasiado larga')
            }
            const title = new RegExp(req.params.title,"i");
            const post = await Post.find({title}).limit(10);
            res.status(200).send({post})
        } catch (error) {
            console.error(error)
        }
    }
}

module.exports = PostController;