const User = require('../models/User')

const UserController = {
    async create(req,res){
        try {
            const user = await User.create(req.body)
            res.status(201).send(user)
        } catch (error) {
            console.error(error)
            res.status(500).send({message:"Ha habido un problema al crear el usuario"})
        }
    },
    async update(req,res){
        try {
            const user = await User.findByIdAndUpdate(req.params._id,req.body,{new:true});
            res.status(200).send({message:"Usuario actualizado con éxito",user});
        } catch (error) {
            console.error(error)
        }
    },
    async delete(req,res){
        try {
            const user = await User.findByIdAndDelete(req.params._id)
            res.status(200).send({message:"El usuario eliminado con éxito",user})
        } catch (error) {
            console.error(error)
            res.status(500).send({message:"Ha habido un problema al eliminar el usuario"})
        }
    },
    async getAll(req,res){
        try {
            const user = await User.find()
            res.status(200).send({message:"Los usuario mostralado",user})
        } catch (error) {
            console.error(error)
            res.status(500).send({message:"Ha habido un problema al mostrarse los usuarios"})
        }
    },
}

module.exports = UserController;