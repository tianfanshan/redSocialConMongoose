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
    commentId:[{type:Object,ref:'Comment'}],
    favorites:[{type:Object,ref:'Post'}],
    followers:[{type:Object,ref:'User'}],
    followings:[{type:Object,ref:'User'}]
},{timestamps:true});

UserSchema.methods.toJSON = function(){
    const user = this._doc;
    delete user.tokens;
    delete user.password;
    delete user.email;
    return user;
}

const User = mongoose.model('User',UserSchema);

module.exports = User;