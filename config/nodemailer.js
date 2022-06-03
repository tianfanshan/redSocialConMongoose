const nodemailer = require('nodemailer')

// const { auth } = require('./keys')
require('dotenv').config();
const USER = process.env.USER;
const PASS = process.env.PASS;

let transporter = nodemailer.createTransport({
    host:'smtp.gmail.com',
    port:465,
    secure:true,
    auth:{USER,PASS}
})

module.exports = transporter