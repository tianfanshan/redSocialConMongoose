const express = require('express');
const { dbConnection } = require('./config/config');
const app = express();
const PORT = 8080;

app.use(express.json())

dbConnection()

app.use('/users',require('./routes/users'));
app.use('/posts',require('./routes/posts'));

app.listen(PORT,console.log(`Servidor levantado por ${PORT}`));
