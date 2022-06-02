const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Por favor rellena tu nombre']
    },
    email:{
        type:String,
        match:[/.+\@.+\.+/,'Este correo no es válido'],
        unique: true,
        required: [true,'Por favor rellen tu correo']
    },
    password:{
        type:String,
        required:[true,'Por favor rellena tu contraseña']
    },
    confirmed:{
        type:String,
        default:false
    },
    age:{
        type:Number,
        required:[true,'Cuantos años tienes?']
    },
    role:{
        type:String,
        default:"user"
    },
    tokens:[],
    postIds:[{type:Object,ref:'Post'}],
    favorites:[{type:Object,ref:'Post'}]
},{timestamps:true});

const User = mongoose.model('User',UserSchema);

module.exports = User;