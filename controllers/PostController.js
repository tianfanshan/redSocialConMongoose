const Post = require('../models/Post')
const User = require('../models/User')

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
    async likes(req,res){
        try {
            // let includeLikes = await req.user.favorites.includes(req.user._id)
            // console.log(includeLikes)
            // if(includeLikes){
            //     res.send('Ya has dado el like')
            // }
            // console.log(likes)
            const post1 = await Post.findById(req.params._id);
            if(post1.likes.includes(req.user._id)){
                return res.send('Ya has dado el like')
            }
            const post =await Post.findByIdAndUpdate(
                req.params._id,
                {$push:{likes:req.user._id}},
                {new:true})    
            console.log(post.likes)
            // if(post.likes.includes(req.user._id)){
            //     post.likes.pop()
            //     return res.send('Ya has dado el like')
            // }
            
            await User.findByIdAndUpdate(
                req.user._id,
                {$push:{favorites:req.params._id}},
                {new:true}
            );
            res.send(post)
        } catch (error) {
            console.error(error)
            res.status(500).send({message:'Ha habido un problema con tu like'})
        }
    },
    async getPostByBody(req,res){
        try {
            if(req.params.body.length > 20){
                return res.status(400).send('Busqueda demasiado larga')
            }
            const body = new RegExp(req.params.body,"i");
            const post = await Post.find({body}).limit(10);
            res.status(200).send({post})
        } catch (error) {
            console.error(error)
        }
    },
    // async getPostWithUserByTitle(req,res){
    //     try {
    //         if(req.params.title.length > 20){
    //             return res.status(400).send('Busqueda demasiado larga')
    //         }
    //         const title = new RegExp(req.params.title,"i");
    //         const post = await Post.find({title},{include:[User]}).limit(10);
    //         res.status(200).send({post})
    //     } catch (error) {
    //         console.error(error)
    //     }
    // },
    async getAll(req,res){
        try {
            const { page = 1 ,limit = 10 } = req.query;
            const post = await Post.find()
            .limit(limit *1)
            .skip((page - 1) * limit);
            res.send(post)
        } catch (error) {
            console.error(error)
        }
    }
}

module.exports = PostController;