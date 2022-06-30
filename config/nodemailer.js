const nodemailer = require('nodemailer')

require('dotenv').config();
const USER = process.env.USER;
const PASS = process.env.PASS;

let transporter = nodemailer.createTransport({
    host:'smtp.gmail.com',
    port:587,
    secure:true,
    auth:{
        pass: PASS,
        pass: PASS
    }
})

module.exports = transporter