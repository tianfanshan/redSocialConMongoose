const User = require('../models/User');
const bcrypt = require('bcrypt');
const transporter = require('../config/nodemailer');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const jwt_secret = process.env.JWT_SECRET;

const UserController = {
    async create(req,res,next){
        try {
            const password = bcrypt.hashSync(req.body.password,10)
            const user = await User.create({
                ...req.body,
                password:password,
                confirmed:false,
                role:"user"
            });
            // const emailToken = jwt.sign({email:req.body.email},jwt_secret,{expiresIn:'28h'})
            // const url = 'http://localhost:8080/users/confirm/'+emailToken
            // await transporter.sendMail({
            //     to:req.body.email,
            //     subject:"Confirme su registro",
            //     html:`<h3>Bienvenido, estás a un paso de registrarte</h3>
            //     <a href="${url}">Click para confirmar tu registro</a>`,
            // })
            res.status(201).send({message:"Te hemos enviado un correo para confirmar el registro",user})
        } catch (error) {
            console.log(error)
            error.origin='User'
            next(error)
        }
    },
    async confirm(req,res){
        try {
            const user = await User.updateOne({confirmed:true},{
                email:req.params.email
            })
            res.status(201).send('Usuario confirmado con éxito');
        } catch (error) {
            console.error(error)
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
          if(!user.confirmed){
              return res.status(400).send({message:"Debes confirmar tu correo"})
          }
          token = jwt.sign({_id:user._id},jwt_secret);
          if(user.tokens.length > 4) user.tokens.shift();
          user.tokens.push(token);
          await user.save();
          return res.send({message:"Bienvenido@"+user.name,token})
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
            const user = await User.find(req.user)
            res.status(200).send({message:"El usuario connectado",user})
        } catch (error) {
            console.error(error)
            res.send(error)
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
    // async getUserLogged(req,res){
    //     try {
    //         if(req.params.name.length > 20){
    //             return res.status(400).send('Busqueda demasiado larga')
    //         }
    //         const name = new RegExp(req.params.name,"i");
    //         console.log(name)
    //         const user = await User.find({name});
    //         console.log(user)
    //         res.statu(200).send({message:"Usuario encontrado",user})
    //     } catch (error) {
    //         console.log(error)
    //         res.send("algo no va bien")
    //     }
    // },
    async logout(req,res){
        try {
            const user = await User.findByIdAndUpdate(req.user._id,{
                $pull:{tokens: req.headers.authorization},
            });
            res.status(200).send({user,message:"Usuario deconectado!"})
        } catch (error) {
            console.error(error)
            res.status(500).send({message:"Ha habido un problema al desconectar el usuario"})
        }
    }
    
}

module.exports = UserController;