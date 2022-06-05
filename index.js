const express = require('express');
const { TypeError } = require('./middleware/errors');
const { dbConnection } = require('./config/config');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 3010;


app.use(express.json())

dbConnection()

app.use('/users',require('./routes/users'));
app.use('/posts',require('./routes/posts'));
app.use('/comments',require('./routes/comments'));

app.use(TypeError)

app.listen(PORT,console.log(`Servidor levantado por ${PORT}`));
