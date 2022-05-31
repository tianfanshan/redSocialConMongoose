const User = require('../models/User')
const bcrypt = require('bcrypt')

const UserController = {
    async create(req,res){
        try {
            req.body.role = 'user';
            const password = bcrypt.hashSync(req.body.password,10)
            const user = await User.create({
                ...req.body,
                password:password,
                confirme:false,
                role:"user"
            })
            res.status(201).send(user)
        } catch (error) {
            console.error(error)
            res.status(500).send({message:"Ha habido un problema al crear el usuario"})
        }
    },
    async login(req,res){
      try {
          const user = await User.findOne({email:req.body.email});
          if(!user){
            return res.status(400).send({message:"Usuario o contraseña incorrectos"})
          }
          const isMatch = bcrypt.compareSync(req.body.password, user.password);
          if(!isMatch){
              return res.status(400).send({message:"Usuario o contraseña incorrectos"})
          }
          return res.send(user)
      } catch (error) {
        res.status(500).send({message:"Ha habido un problema"})
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
    async getCurrentUser(req,res){
        try {
            const user = await User.findById(req.params._id)
            res.status(200).send({message:"El usuario connectado",user})
        } catch (error) {
            console.error(error)
        }
    },
    async getUserById(req,res){
        try {
            const user = await User.findById(req.params._id)
            res.status(200).send({message:"Usuario encontrado",user})
        } catch (error) {
            console.error(error)
        }
    },
    async getUserByName(req,res){
        try {
            if(req.params.name.length > 20){
                return res.status(400).send('Busqueda demasiado larga')
            }
            const name = new RegExp(req.params.name,"i");
            const user = await User.findOne({name})
            res.status(200).send({message:"Usuario encontrado",user})
        } catch (error) {
            console.error(error)
        }
    },
    // async logout(req,res){
    //     try {
    //         const user = await User.findByIdAndDelete(req.params._id)
    //         res.status(200).send({user,message:"Usuario deconectado!"})
    //     } catch (error) {
    //         console.error(error)
    //         res.status(500).send({message:"Ha habido un problema al desconectar el usuario"})
    //     }
    // },
    
}

module.exports = UserController;