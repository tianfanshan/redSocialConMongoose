const Post = require('../models/Post')
const { populate } = require('../models/User')
const User = require('../models/User')
const { post } = require('../routes/users')
const { user } = require('../models/User')
 
const PostController ={
    async create(req,res){
        try {
            const post = await Post.create({
                ...req.body,
                daliveryDate:new Date(),
                userId:req.user._id,
            })
            await User.findByIdAndUpdate(
                req.user._id,
                {$push:{postIds:post._id}},
            )
            res.status(201).send(post)
        } catch (error) {
            console.error(error)
            res.status(404).send('Algo no va bien')
        }
    },
    async update(req,res){
        try {
            const posts = await Post.findById(req.params._id)
            if(!posts){
                return res.send('No hemos encontrado el id del post')
            }
            const post = await Post.findByIdAndUpdate(
                req.params._id,
                {...req.body,userId:req.user._id},
                {new:true}
            );
            res.send({message:"Post actualizado con éxito",post});
        } catch (error) {
            console.error(error)
            res.status(404).send('Introduce un id de formato correcto')
        }
    },
    async delete(req,res){
        try {
            const posts = await Post.findById(req.params._id)
            if(!posts){
                return  res.send('No hemos encontrado el id del post')
            }
            await Post.findByIdAndDelete(req.params._id)
            res.send({message:"Post eliminado con éxito"})
        } catch (error) {
            console.error(error)
            res.status(404).send('Introduce un id de formato correcto')
        }
    },
    async getPostById(req,res){
        try {
            const posts = await Post.findById(req.params._id)
            if(!posts){
                return res.send('No hemos encontrado el post')
            }
            const post = await Post.findById(req.params._id)
            .populate({path:'commentIds',populate:{path:'userId'}})
            res.status(200).send(post)
        } catch (error) {
            console.error(error)
            res.status(404).send('Introduce un id de formato correcto')
        }
    },
    async likesUp(req,res){
        try {
            const posts = await Post.findById(req.params._id)
            if(!posts){
                return res.send('No hemos encontrado el id del post')
            }
            const post1 = await Post.findById(req.params._id);
            if(post1.likes.includes(req.user._id)){
                return res.send('Ya has dado el like')
            }
            const post =await Post.findByIdAndUpdate(
                req.params._id,
                {$push:{likes:req.user._id}},
                {new:true})    
            console.log(post.likes)
            const user = await User.findByIdAndUpdate(
                req.user._id,
                {$push:{favorites:req.params._id}},
                {new:true}
            );
            console.log(user.favorites)
            res.send(post)
        } catch (error) {
            console.error(error)
            res.status(404).send('Introduce un id de formato correcto')
        }
    },
    async likesDown(req,res){
        try {
            const posts = await Post.findById(req.params._id)
            if(!posts){
                return res.send('No hemos encontrado el id del post')
            }
            const post1 = await Post.findById(req.params._id)
            if(!post1.likes.includes(req.user._id)){
                return res.send('No has dado el like a este post')
            }
            const post = await Post.findByIdAndUpdate(
                req.params._id,
                {$pull:{likes:req.user._id}},
                {$new:true}
                )
                console.log(post.likes)
            const user = await User.findByIdAndUpdate(
                req.user._id,
                {$pull:{favorites:req.params._id}},
                {$new:true}
            )
            console.log(user.favorites)
            res.send(post)
        } catch (error) {
            console.error(error)
            res.status(404).send('Introduce un id de formato correcto')
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
            res.send('Lo sentimos')
        }
    },
    async getPostWithUserByBody(req,res){
        try {
            if(req.params.body.length > 20){
                return res.status(400).send('Busqueda demasiado larga')
            }
            const body = new RegExp(req.params.body,"i");
            const post = await Post.find({body}).limit(10);
            res.status(200).send({post})
        } catch (error) {
            console.error(error)
            res.send('Lo sentimos')
        }
    },
    async getAll(req,res){
        try {
            const { page = 1 ,limit = 10 } = req.query;
            const post = await Post.find()
            .populate('likes.userId')
            .limit(limit * 1)
            .skip((page - 1) * limit);
            res.send(post)
        } catch (error) {
            console.error(error)
        }
    }
}

module.exports = PostController;