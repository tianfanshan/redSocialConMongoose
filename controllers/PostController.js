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
        }
    }
}

module.exports = PostController;