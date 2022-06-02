const mongoose = require('mongoose');

// const validationEmail = UserSchema.path('email').validate(function(email){
//     let emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
//     return emailRegex.text(email.text);
// },'El campo del correo no puede esar vacio.')

const UserSchema = new mongoose.Schema({
    // activation_token:{
    //     type:String,
    //     default:function(){
    //         return randToken.generate(64);
    //     }
    // },
    name:{
        type:String,
        required:[true,'Porfavor llena el campo vacio']
    },
    email:{
        type:String,
        unique: [true,'Porfavor llena el campo vacio'],
        required: true
    },
    password:{
        type:String,
        required:[true,'Porfavor llena el campo vacio']
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
    tokens:[]
},{timestamps:true});

const User = mongoose.model('User',UserSchema);

module.exports = User;