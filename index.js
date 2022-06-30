const express = require('express');
const app = express();
const cors = require('cors')

const { TypeError } = require('./middleware/errors');
const { dbConnection } = require('./config/config');


require('dotenv').config();
const PORT = process.env.PORT || 3010;

app.use(cors())

app.use(express.json())

dbConnection()

app.use('/users',require('./routes/users'));
app.use('/posts',require('./routes/posts'));
app.use('/comments',require('./routes/comments'));

app.use(TypeError)

app.listen(PORT,console.log(`Servidor levantado por ${PORT}`));
