const express = require('express');
const app = express();

const { TypeError } = require('./middleware/errors');
const { dbConnection } = require('./config/config');

const multer = require('multer')

const fileStorageEngine =  multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, './images')
    },
    filename: (req, file, cb)=>{
        cb(null, Date.now() + '--' + file.originalname)
    }
})

const upload = multer({storage});
require('dotenv').config();
const PORT = process.env.PORT || 3010;


app.use(express.json())

dbConnection()

app.use('/users',require('./routes/users'));
app.use('/posts',require('./routes/posts'));
app.use('/comments',require('./routes/comments'));

app.use(TypeError)

app.listen(PORT,console.log(`Servidor levantado por ${PORT}`));
