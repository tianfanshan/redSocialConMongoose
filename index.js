const express = require('express');
const { dbConnection } = require('./config/config');
const app = express()
const router = express.Router();
const PORT = 8080;
const secret_jwt_code = "psmR3HuOihHKfqZymolm"

app.use(express.json())

dbConnection()

app.use('/users',require('./routes/users'))

app.listen(PORT,console.log(`Servidor levantado por ${PORT}`));
