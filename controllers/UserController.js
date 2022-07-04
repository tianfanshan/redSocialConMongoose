const User = require("../models/User");
const bcrypt = require("bcrypt");
const transporter = require("../config/nodemailer");
const jwt = require("jsonwebtoken");
const Post = require("../models/Post");
const Comment = require("../models/Comment");
require("dotenv").config();
const jwt_secret = process.env.JWT_SECRET;

const UserController = {
  async create(req, res, next) {
    try {
      if (req.file) {
        req.body.image = req.file.filename;
      }
      const password = bcrypt.hashSync(req.body.password, 10);
      const user = await User.create({
        ...req.body,
        password: password,
        confirmed: false,
        role: "user",
      });
      // const emailToken = jwt.sign({email:req.body.email},jwt_secret,{expiresIn:'28h'})
      // const url = 'http://localhost:8080/users/confirm/'+emailToken
      // await transporter.sendMail({
      //     to:req.body.email,
      //     subject:"Confirme su registro",
      //     html:`<h3>Bienvenido, estás a un paso de registrarte</h3>
      //     <a href="${url}">Click para confirmar tu registro</a>`,
      // })
      res.status(201).send({
        message: "Te hemos enviado un correo para confirmar el registro",
        user,
      });
    } catch (error) {
      console.log(error);
      error.origin = "User";
      next(error);
    }
  },
  async confirm(req, res) {
    try {
      await User.updateOne(
        { confirmed: true },
        {
          email: req.params.email,
        }
      );
      res.status(201).send("Usuario confirmado con éxito");
    } catch (error) {
      console.error(error);
    }
  },
  async login(req, res) {
    try {
      const user = await User.findOne({ email: req.body.email });
      console.log(user);
      if (!user) {
        return res
          .status(400)
          .send({ message: "Usuario o contraseña incorrectos" });
      }
      const isMatch = bcrypt.compareSync(req.body.password, user.password);
      console.log(isMatch);
      if (!isMatch) {
        return res
          .status(400)
          .send({ message: "Usuario o contraseña incorrectos" });
      }
      if (!user.confirmed) {
        return res.status(400).send({ message: "Debes confirmar tu correo" });
      }
      token = jwt.sign({ _id: user._id }, jwt_secret);
      if (user.tokens.length > 4) user.tokens.shift();
      user.tokens.push(token);
      await user.save();
      return res.send({ message: "Bienvenido@" + user.name, token, user });
    } catch (error) {
      res.status(500).send({ message: "Ha habido un problema" });
    }
  },
  async update(req, res) {
    try {
      const { name, image, password, age } = req.body;
      const hashpassword = bcrypt.hashSync(req.body.password, 10);
      const users = await User.findById(req.params._id);
      if (!users) {
        return res.send("No hemos encontrado el usuario!");
      }
      const user = await User.findByIdAndUpdate(
        req.user._id,
        { name, image, role: "user", age, password: hashpassword },
        { new: true }
      );
      console.log(user);
      res.status(200).send({ message: "Usuario actualizado con éxito", user });
    } catch (error) {
      console.error(error);
      res.send(error);
    }
  },
  async getAll(req, res) {
    try {
      const user = await User.find();
      res.status(200).send({ message: "Los usuario mostralado", user });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "Ha habido un problema al mostrarse los usuarios" });
    }
  },
  async getCurrentUser(req, res) {
    try {
      const users = await User.findById(req.user._id);
      if (!users) {
        return res.send("Por favor tienes hacer login primero");
      }
      const user = await User.find(req.user);
      res.status(200).send({ message: "El usuario connectado", user });
    } catch (error) {
      console.error(error);
      res.send(error);
    }
  },
  async deleteUserById(req, res) {
    try {
      const users = await User.findById(req.params._id);
      if (!users) {
        return res.send("No hemos encontrado el usuario!");
      }
      const user = await User.findByIdAndDelete(req.params._id);
      const posts = await Post.find({ userId: req.params._id });
      await Post.deleteMany({ userId: req.params._id });
      await Comment.deleteMany({ userId: req.params._id });

      posts.forEach(async (post) => {
        await Comment.deleteMany({ postId: post._id });
        const userss = await User.find({ favorites: post._id });
        userss.forEach(async (user) => {
          await User.findByIdAndUpdate(user._id, {
            $pull: { favorites: req.params._id },
          });
        });
      });

      const commentslike = await User.find({ commentsLikes: req.params._id });
      commentslike.forEach(async (clikes) => {
        await User.findByIdAndUpdate(clikes._id, {
          $pull: { commentsLikes: req.params._id },
        });
      });

      const followers = await User.find({ follower: req.params._id });
      followers.forEach(async (follower) => {
        await User.findByIdAndUpdate(follower._id, {
          $pull: { followers: req.params._id },
        });
      });

      const followings = await User.find({ followings: req.params._id });
      followings.forEach(async (follow) => {
        await User.findByIdAndUpdate(follow._id, {
          $pull: { followings: req.params._id },
        });
      });

      res.status(200).send({ message: "Eliminado", user });
    } catch (error) {
      console.error(error);
      res.send(error);
    }
  },
  async getUserById(req, res) {
    try {
      const user = await User.findById(req.params._id);
      if (!user) {
        return res.send("No hemos encontrado el usuario!");
      }
      res.status(200).send({ message: "Usuario encontrado", user });
    } catch (error) {
      console.error(error);
      res.send(error);
    }
  },
  async getUserByName(req, res) {
    try {
      if (req.params.name.length > 20) {
        return res.status(400).send("Busqueda demasiado larga");
      }
      const name = new RegExp(req.params.name, "i");
      const user = await User.find({ name });
      res.status(200).send({ message: "Usuario encontrado", user });
    } catch (error) {
      console.error(error);
      res.send("Lo sentimos");
    }
  },
  async logout(req, res) {
    try {
      const user = await User.findByIdAndUpdate(req.user._id, {
        $pull: { tokens: req.headers.authorization },
      });
      res.status(200).send({ user, message: "Usuario deconectado!" });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "Ha habido un problema al desconectar el usuario" });
    }
  },
  async follower(req, res) {
    try {
      const user = await User.findById(req.params._id);
      if (user.followers.includes(req.user._id)) {
        return res.send("Ya estas siguiendo al usuario");
      }
      const follower = await User.findByIdAndUpdate(
        req.params._id,
        { $push: { followers: req.user._id.toString() } },
        { new: true }
      );
      await User.findByIdAndUpdate(
        req.user._id,
        { $push: { followings: req.params._id } },
        { new: true }
      );
      res.send(follower);
    } catch (error) {
      console.error(error);
      res.send("Disculpe pos las molestias intenta dentro de 5 minutos...");
    }
  },
  async followerOut(req, res) {
    try {
      const user = await User.findById(req.params._id);
      console.log(user);
      if (!user.followers.includes(req.user._id.toString())) {
        return res.send("No tienes seguido a este usuario");
      }
      const follower = await User.findByIdAndUpdate(
        req.params._id,
        { $pull: { followers: req.user._id.toString() } },
        { new: true }
      );
      await User.findByIdAndUpdate(
        req.user._id,
        { $pull: { followings: req.params._id } },
        { new: true }
      );
      res.send(follower);
    } catch (error) {
      console.error(error);
      res.send("No es culpa tuya, estamos en ello...");
    }
  },
  async UserPostFollowerNumber(req, res) {
    try {
      const users = await User.findById(req.user._id);
      if (!users) {
        return res.send("Por favor tienes hacer login primero");
      }
      const user = await User.findById(req.user._id).populate("postIds");
      const userName = await user.name;
      const post = await user.postIds;
      const followers = await user.followers.length;
      res.send({ userName, post, followers });
    } catch (error) {
      console.error(error);
      res.send("Vuelve a intentar dentro de 6 minutos");
    }
  },
  async UserPostFollowerName(req, res) {
    try {
      const users = await User.findById(req.user._id);
      if (!users) {
        return res.send("Por favor tienes hacer login primero");
      }
      const user = await User.findById(req.user._id).populate("postIds");
      const userName = await user.name;
      const post = await user.postIds;
      const follower = await user.followers;
      const followerName = await User.find({ _id: { $in: follower } });
      let followerNames = [];
      followerName.forEach((item) => followerNames.push(item.name));
      res.send({ userName, post, followerNames });
    } catch (error) {
      console.error(error);
      res.send("Vuelve a probar dentro de 7 minutos");
    }
  },
};

module.exports = UserController;
