<<<<<<< HEAD
const mongoose = require('mongoose');
require('dotenv').config();
const MONGO_URI = process.env.MONGO_URI;

const dbConnection = async()=>{
    try {
        await mongoose.connect(MONGO_URI);
        console.log('Base de datos conectada con éxito!');
    } catch (error) {
        console.error(error);
        throw new Error('Error a la hora de iniciar la base de datos.')
    }
};



module.exports = {
    dbConnection
=======
const mongoose = require("mongoose");
require('dotenv').config();
const MONGO_URI  = process.env.MONGO_URI;

const dbConnection = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Base de datos conectada con éxito");
  } catch (error) {
    console.error(error);
    throw new Error("Error a la hora de iniciar la base de datos");
  }
};

module.exports = {
  dbConnection,
>>>>>>> comment
};