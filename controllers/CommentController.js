const Comment = require('../models/Comment')

const CommentController = {
    async create(req,res){
        try {
            const comment = await Comment.findById(req.params._id
                
                // ...req.body,
                // daliveryDate:new Date(),
                // userId:req.user._id
            )

            res.status(201).send({message:'Comentario creado',comment})
        } catch (error) {
            console.error(error)
        }
    },
}

module.exports = CommentController;